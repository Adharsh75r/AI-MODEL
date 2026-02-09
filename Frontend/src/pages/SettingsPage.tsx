import { GlassCard } from "@/components/dashboard";
import { Settings as SettingsIcon, Bell, Lock, Palette, Database } from "lucide-react";

export default function SettingsPage() {
  const settingsGroups = [
    { icon: Bell, label: "Notifications", description: "Configure alert preferences" },
    { icon: Lock, label: "Security", description: "Manage access controls" },
    { icon: Palette, label: "Appearance", description: "Customize dashboard theme" },
    { icon: Database, label: "Data", description: "Export and backup settings" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Configure your AI governance dashboard preferences
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {settingsGroups.map((group) => (
          <GlassCard 
            key={group.label} 
            className="cursor-pointer transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <group.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">{group.label}</h3>
                <p className="text-sm text-muted-foreground">{group.description}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Placeholder */}
      <GlassCard className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <SettingsIcon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Settings Coming Soon</h3>
        <p className="mt-2 max-w-md text-muted-foreground">
          This is a placeholder page. Full settings functionality will be available in a future update.
        </p>
      </GlassCard>
    </div>
  );
}
