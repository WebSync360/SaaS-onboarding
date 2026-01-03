"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "../_actions";

// Define the roles locally so the UI can map through them
const roles = [
  { id: "developer", title: "Developer", description: "I build and ship code." },
  { id: "designer", title: "Designer", description: "I design beautiful interfaces." },
  { id: "manager", title: "Manager", description: "I oversee projects and teams." },
];

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    setLoading(true);
    
    const formData = new FormData();
    formData.append("role", selectedRole);

    const res = await completeOnboarding(formData);

    if (res.message) {
      // Force a session refresh so the middleware sees the new metadata
      await router.refresh();
      router.push("/dashboard");
    } else {
      alert(res.error || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Choose your role</h1>
        <p className="text-slate-600">This helps us customize your workspace experience....</p>
        
        <div className="grid gap-4 mt-8">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`p-4 text-left border-2 rounded-xl transition-all ${
                selectedRole === role.id 
                ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" 
                : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <h3 className="font-semibold text-slate-900">{role.title}</h3>
              <p className="text-sm text-slate-500">{role.description}</p>
            </button>
          ))}
        </div>

        <button
          disabled={!selectedRole || loading}
          onClick={handleContinue}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 hover:bg-blue-700 transition-all shadow-sm"
        >
          {loading ? "Saving your profile..." : "Continue to Dashboard"}
        </button>
      </div>
    </div>
  );
}