import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your account and workspace preferences.</p>
      </div>
      <div className="flex justify-center md:justify-start">
        <UserProfile routing="hash" />
      </div>
    </div>
  );
}