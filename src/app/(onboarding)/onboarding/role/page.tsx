"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveRole } from "../_actions";
import { UserRole } from "@/types/globals";

// Updated IDs to match your UserRole type exactly
const roles = [
  { id: "DEVELOPER", title: "Developer", description: "I build and ship code." },
  { id: "DESIGNER", title: "Designer", description: "I design beautiful interfaces." },
];

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    if (!selectedRole) return;
    
    setLoading(true);
    
    // Step 1: Just save the role
    const res = await saveRole(selectedRole as UserRole);

    if (res.success) {
      // Step 2: Move to the next screen in the flow
      router.push("/onboarding/workspace");
    } else {
      alert(res.error || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Choose your role</h1>
        <p className="text-slate-600">Step 1 of 3: Tell us what you do.</p>
      </div>
      
      <div className="grid gap-4 mt-8">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(role.id as UserRole)}
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
        {loading ? "Saving..." : "Continue to Workspace Name"}
      </button>
    </div>
  );
}