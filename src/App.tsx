import { useState } from "react";
import {
  BookOpen,
  Headphones,
  LayoutDashboard,
  Library,
  Map,
  MessageSquare,
  PenLine,
  Brain,
  Ruler,
  Target,
  Layers,
  UserCog,
} from "lucide-react";
import { AuthProvider, useAuth } from "@/store/auth";
import { StudyProvider } from "@/store/store";
import { useTheme } from "@/hooks/useTheme";
import AuthScreen from "@/components/AuthScreen";
import Header from "@/components/Header";
import AiTutor from "@/components/AiTutor";
import Dashboard from "@/features/Dashboard";
import LevelPlan from "@/features/LevelPlan";
import Grammar from "@/features/Grammar";
import Vocab from "@/features/Vocab";
import Reading from "@/features/Reading";
import Listening from "@/features/Listening";
import Essay from "@/features/Essay";
import Speaking from "@/features/Speaking";
import Tactics from "@/features/Tactics";
import WordBank from "@/features/WordBank";
import Resources from "@/features/Resources";
import Account from "@/features/Account";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GUEST_KEY = "nb_guest";

const TABS = [
  { v: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { v: "plan", label: "Plan", icon: Map },
  { v: "grammar", label: "Grammar", icon: Ruler },
  { v: "vocab", label: "Vocabulary", icon: Brain },
  { v: "wordbank", label: "Word Bank", icon: Layers },
  { v: "reading", label: "Reading", icon: BookOpen },
  { v: "listening", label: "Listening", icon: Headphones },
  { v: "essay", label: "Writing", icon: PenLine },
  { v: "speaking", label: "Speaking", icon: MessageSquare },
  { v: "tactics", label: "Tactics", icon: Target },
  { v: "resources", label: "Resources", icon: Library },
  { v: "account", label: "Account", icon: UserCog },
] as const;

function Shell({ onSignIn }: { onSignIn: () => void }) {
  const { theme, toggle } = useTheme();
  const [tab, setTab] = useState("dashboard");
  return (
    <div className="relative min-h-screen">
      <div className="app-aurora pointer-events-none fixed inset-0 -z-10" />
      <Header theme={theme} onToggleTheme={toggle} />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Tabs value={tab} onValueChange={setTab}>
          <div className="-mx-4 overflow-x-auto px-4 pb-1">
            <TabsList className="w-max">
              {TABS.map((t) => (
                <TabsTrigger key={t.v} value={t.v} data-tab={t.v}>
                  <t.icon className="size-4" />
                  <span className="hidden sm:inline">{t.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="dashboard"><Dashboard /></TabsContent>
          <TabsContent value="plan"><LevelPlan /></TabsContent>
          <TabsContent value="grammar"><Grammar /></TabsContent>
          <TabsContent value="vocab"><Vocab /></TabsContent>
          <TabsContent value="wordbank"><WordBank /></TabsContent>
          <TabsContent value="reading"><Reading /></TabsContent>
          <TabsContent value="listening"><Listening /></TabsContent>
          <TabsContent value="essay"><Essay /></TabsContent>
          <TabsContent value="speaking"><Speaking /></TabsContent>
          <TabsContent value="tactics"><Tactics /></TabsContent>
          <TabsContent value="resources"><Resources /></TabsContent>
          <TabsContent value="account"><Account onSignIn={onSignIn} /></TabsContent>
        </Tabs>
      </main>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        NineBands · your progress is safe. Aim for 9/9 💪
      </footer>
      <AiTutor tab={tab} />
    </div>
  );
}

function Root() {
  const { user, loading, enabled } = useAuth();
  const [guest, setGuest] = useState(() => localStorage.getItem(GUEST_KEY) === "1");

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="size-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (enabled && !user && !guest) {
    return (
      <AuthScreen
        onGuest={() => {
          localStorage.setItem(GUEST_KEY, "1");
          setGuest(true);
        }}
      />
    );
  }

  return (
    <StudyProvider>
      <Shell
        onSignIn={() => {
          localStorage.removeItem(GUEST_KEY);
          setGuest(false);
        }}
      />
    </StudyProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
