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
  UserCog,
} from "lucide-react";
import { AuthProvider, useAuth } from "@/store/auth";
import { StudyProvider } from "@/store/store";
import { useTheme } from "@/hooks/useTheme";
import AuthScreen from "@/components/AuthScreen";
import Header from "@/components/Header";
import Dashboard from "@/features/Dashboard";
import LevelPlan from "@/features/LevelPlan";
import Grammar from "@/features/Grammar";
import Vocab from "@/features/Vocab";
import Reading from "@/features/Reading";
import Listening from "@/features/Listening";
import Essay from "@/features/Essay";
import Speaking from "@/features/Speaking";
import Resources from "@/features/Resources";
import Account from "@/features/Account";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GUEST_KEY = "nb_guest";

const TABS = [
  { v: "dashboard", label: "Panel", icon: LayoutDashboard },
  { v: "plan", label: "Plan", icon: Map },
  { v: "grammar", label: "Grammar", icon: Ruler },
  { v: "vocab", label: "Kelime", icon: Brain },
  { v: "reading", label: "Okuma", icon: BookOpen },
  { v: "listening", label: "Dinleme", icon: Headphones },
  { v: "essay", label: "Yazma", icon: PenLine },
  { v: "speaking", label: "Konuşma", icon: MessageSquare },
  { v: "resources", label: "Kaynaklar", icon: Library },
  { v: "account", label: "Hesap", icon: UserCog },
] as const;

function Shell({ onSignIn }: { onSignIn: () => void }) {
  const { theme, toggle } = useTheme();
  return (
    <div className="min-h-screen">
      <Header theme={theme} onToggleTheme={toggle} />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Tabs defaultValue="dashboard">
          <div className="-mx-4 overflow-x-auto px-4 pb-1">
            <TabsList className="w-max">
              {TABS.map((t) => (
                <TabsTrigger key={t.v} value={t.v}>
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
          <TabsContent value="reading"><Reading /></TabsContent>
          <TabsContent value="listening"><Listening /></TabsContent>
          <TabsContent value="essay"><Essay /></TabsContent>
          <TabsContent value="speaking"><Speaking /></TabsContent>
          <TabsContent value="resources"><Resources /></TabsContent>
          <TabsContent value="account"><Account onSignIn={onSignIn} /></TabsContent>
        </Tabs>
      </main>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        NineBands · ilerlemen güvende. Hedef 9/9 💪
      </footer>
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
