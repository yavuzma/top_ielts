import { CalendarDays, Cloud, CloudOff, Sparkles, Trash2 } from "lucide-react";
import { useAuth } from "@/store/auth";
import { useStudy } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ApiKeyForm from "@/components/ApiKeyForm";

export default function Account({ onSignIn }: { onSignIn: () => void }) {
  const { user, enabled, logout } = useAuth();
  const { state, setExamDate, resetLocal } = useStudy();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {user ? <Cloud className="size-5 text-success" /> : <CloudOff className="size-5 text-warning" />}
            Account & sync
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {user ? (
            <>
              <p className="text-sm">
                Signed in as <b>{user.displayName || user.email}</b>. Your progress syncs
                automatically across all your devices.
              </p>
              <Button variant="outline" onClick={() => void logout()}>
                Sign out
              </Button>
            </>
          ) : enabled ? (
            <>
              <p className="text-sm text-muted-foreground">
                You're in guest mode — your progress is only on this device. Create an account to see
                the same data on your phone, tablet and computer. (Your guest progress is carried over.)
              </p>
              <Button onClick={onSignIn}>Sign in / Sign up</Button>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Cloud sync isn't configured (Firebase) — guest mode. Setup steps are in the README.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" /> AI speaking coach
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Connect your OpenAI API key to unlock live speaking practice with Iris, your AI examiner.
          </p>
        </CardHeader>
        <CardContent>
          <ApiKeyForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="size-5" /> Exam date
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="exam">Set a date for the countdown</Label>
          <Input
            id="exam"
            type="date"
            value={state.examDate ?? ""}
            onChange={(e) => setExamDate(e.target.value || null)}
            className="max-w-xs"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="size-5" /> Reset progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Deletes the progress for this account/device. This cannot be undone.
          </p>
          <Button
            variant="destructive"
            onClick={() => {
              if (confirm("All your progress will be deleted. Are you sure?")) resetLocal();
            }}
          >
            Reset
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
