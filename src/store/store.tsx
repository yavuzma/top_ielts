import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/store/auth";
import type { Level } from "@/data/content";
import {
  emptyState,
  mergeStates,
  type EssayEntry,
  type StudyState,
} from "@/store/types";
import { newCard, schedule, type Grade } from "@/lib/srs";

const LS_PREFIX = "nb_state_";
const todayStr = () => new Date().toISOString().slice(0, 10);

function loadLS(key: string): StudyState {
  try {
    const raw = localStorage.getItem(LS_PREFIX + key);
    if (raw) return { ...emptyState(), ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return emptyState();
}
function saveLS(key: string, s: StudyState) {
  try {
    localStorage.setItem(LS_PREFIX + key, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

function bump(s: { count: number; last: string | null }) {
  const today = todayStr();
  if (s.last === today) return s;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  return { count: s.last === yesterday ? s.count + 1 : 1, last: today };
}

interface StudyActions {
  setLevel: (l: Level) => void;
  toggleTask: (id: string, v: boolean) => void;
  toggleGrammar: (id: string, v: boolean) => void;
  markVocabKnown: (key: string) => void;
  reviewVocab: (key: string, grade: Grade) => void;
  addEssay: (e: Omit<EssayEntry, "id">) => void;
  deleteEssay: (id: string) => void;
  markReading: (id: string) => void;
  markListening: (id: string) => void;
  setBand: (key: string, value: string) => void;
  setExamDate: (date: string | null) => void;
  resetLocal: () => void;
}

interface StudyValue extends StudyActions {
  state: StudyState;
  syncing: boolean;
}

const StudyContext = createContext<StudyValue | null>(null);

export function StudyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [state, setState] = useState<StudyState>(() => loadLS("guest"));
  const [syncing, setSyncing] = useState(false);

  const stateRef = useRef(state);
  stateRef.current = state;
  const keyRef = useRef("guest");
  const lastPushed = useRef(0);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Write to the remote document (debounced)
  const pushRemote = useCallback(
    (s: StudyState) => {
      if (!db || !user) return;
      if (pushTimer.current) clearTimeout(pushTimer.current);
      pushTimer.current = setTimeout(() => {
        lastPushed.current = s.updatedAt;
        setDoc(doc(db!, "users", user.uid), s as unknown as Record<string, unknown>).catch((e) =>
          console.warn("Sync write error:", e),
        );
      }, 700);
    },
    [user],
  );

  // On identity change: load the right key, migrate guest data, connect to the cloud
  useEffect(() => {
    let unsub: (() => void) | undefined;
    const key = user ? user.uid : "guest";
    keyRef.current = key;

    let base = loadLS(key);
    if (user) {
      const guest = loadLS("guest");
      if (guest.updatedAt) base = mergeStates(base, guest);
    }

    const connect = async () => {
      if (db && user) {
        setSyncing(true);
        try {
          const ref = doc(db, "users", user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) base = mergeStates(base, snap.data() as Partial<StudyState>);
          saveLS(key, base);
          setState(base);
          lastPushed.current = base.updatedAt;
          // migrate progress made while a guest up to the cloud
          pushRemote(base);
          unsub = onSnapshot(ref, (s) => {
            if (!s.exists()) return;
            const remote = s.data() as Partial<StudyState>;
            if ((remote.updatedAt || 0) > stateRef.current.updatedAt) {
              const merged = mergeStates(stateRef.current, remote);
              saveLS(keyRef.current, merged);
              setState(merged);
            }
          });
        } catch (e) {
          console.warn("Cloud connection error:", e);
          saveLS(key, base);
          setState(base);
        } finally {
          setSyncing(false);
        }
      } else {
        saveLS(key, base);
        setState(base);
      }
    };
    void connect();

    return () => {
      if (unsub) unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  // Apply state + persist + push to the cloud
  const commit = useCallback(
    (updater: (s: StudyState) => StudyState) => {
      setState((prev) => {
        const next = updater(prev);
        next.updatedAt = Date.now();
        saveLS(keyRef.current, next);
        pushRemote(next);
        return next;
      });
    },
    [pushRemote],
  );

  const actions: StudyActions = {
    setLevel: (l) => commit((s) => ({ ...s, level: l })),
    toggleTask: (id, v) =>
      commit((s) => ({
        ...s,
        tasks: { ...s.tasks, [id]: v },
        streak: v ? bump(s.streak) : s.streak,
      })),
    toggleGrammar: (id, v) =>
      commit((s) => ({
        ...s,
        grammar: { ...s.grammar, [id]: v },
        streak: v ? bump(s.streak) : s.streak,
      })),
    markVocabKnown: (key) =>
      commit((s) => ({
        ...s,
        vocab: { ...s.vocab, [key]: "known" },
        streak: bump(s.streak),
      })),
    reviewVocab: (key, grade) =>
      commit((s) => ({
        ...s,
        srs: { ...s.srs, [key]: schedule(s.srs[key] ?? newCard(), grade) },
        streak: bump(s.streak),
      })),
    addEssay: (e) =>
      commit((s) => {
        const id = "e" + Date.now();
        return {
          ...s,
          essays: { ...s.essays, [id]: { ...e, id } },
          streak: bump(s.streak),
          essayStreak: bump(s.essayStreak),
        };
      }),
    deleteEssay: (id) =>
      commit((s) => {
        const essays = { ...s.essays };
        delete essays[id];
        return { ...s, essays };
      }),
    markReading: (id) =>
      commit((s) => ({
        ...s,
        reading: { ...s.reading, [id]: todayStr() },
        streak: bump(s.streak),
      })),
    markListening: (id) =>
      commit((s) => ({
        ...s,
        listening: { ...s.listening, [id]: todayStr() },
        streak: bump(s.streak),
      })),
    setBand: (key, value) => commit((s) => ({ ...s, bands: { ...s.bands, [key]: value } })),
    setExamDate: (date) => commit((s) => ({ ...s, examDate: date })),
    resetLocal: () => {
      localStorage.removeItem(LS_PREFIX + keyRef.current);
      const fresh = emptyState();
      setState(fresh);
      pushRemote(fresh);
    },
  };

  return (
    <StudyContext.Provider value={{ state, syncing, ...actions }}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const ctx = useContext(StudyContext);
  if (!ctx) throw new Error("useStudy must be used within StudyProvider");
  return ctx;
}

export { todayStr };
