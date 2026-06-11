import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/shared/AppShell";
import { GlassCard } from "@/components/shared/KpiCard";
import { AuthInput } from "@/components/shared/AuthShell";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();
  return (
    <AppShell title="Settings">
      <div className="grid lg:grid-cols-2 gap-4">
        <GlassCard hover={false}>
          <div className="font-semibold mb-3">Profile</div>
          <div className="space-y-3">
            <AuthInput placeholder="Full name" />
            <AuthInput placeholder="Email" />
            <AuthInput placeholder="College" />
            <button className="px-4 py-2 rounded-xl gradient-primary text-sm font-medium text-white glow-sm">
              Save changes
            </button>
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <div className="font-semibold mb-3">Notifications</div>
          <div className="space-y-3 text-sm">
            {["Deadline alerts", "New high-match opportunities", "Weekly trend digest", "Recruiter activity"].map((n) => (
              <label key={n} className="flex items-center justify-between cursor-pointer">
                <span>{n}</span>
                <input type="checkbox" defaultChecked className="accent-[var(--neon-purple)]" />
              </label>
            ))}
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <div className="font-semibold mb-3">Subscription</div>
          <div className="text-sm text-muted-foreground">You're on the <span className="text-foreground font-medium">Starter</span> plan.</div>
          <button className="mt-3 px-4 py-2 rounded-xl gradient-primary text-sm font-medium text-white glow-sm">Upgrade to Pro</button>
        </GlassCard>

        <GlassCard hover={false}>
          <div className="font-semibold mb-3 text-[var(--neon-pink)]">Danger zone</div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              toast.success("Signed out");
              navigate({ to: "/" });
            }}
            className="px-4 py-2 rounded-xl glass text-sm hover:bg-white/8"
          >
            Sign out everywhere
          </button>
        </GlassCard>
      </div>
    </AppShell>
  );
}
