import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth, firebaseEnabled } from "@/lib/firebase";

interface AuthValue {
  user: User | null;
  loading: boolean;
  enabled: boolean;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(firebaseEnabled);

  useEffect(() => {
    if (!firebaseEnabled || !auth) {
      setLoading(false);
      return;
    }
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const signUp: AuthValue["signUp"] = async (name, email, password) => {
    if (!auth) throw new Error("Auth devre dışı");
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    setUser({ ...cred.user });
  };
  const signIn: AuthValue["signIn"] = async (email, password) => {
    if (!auth) throw new Error("Auth devre dışı");
    await signInWithEmailAndPassword(auth, email, password);
  };
  const signInWithGoogle: AuthValue["signInWithGoogle"] = async () => {
    if (!auth) throw new Error("Auth devre dışı");
    await signInWithPopup(auth, new GoogleAuthProvider());
  };
  const logout: AuthValue["logout"] = async () => {
    if (auth) await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, enabled: firebaseEnabled, signUp, signIn, signInWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
