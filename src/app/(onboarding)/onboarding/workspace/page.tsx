"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateWorkspaceMetadata } from "../_actions";

export default function WorkspacePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleNext = async () => {
    await updateWorkspaceMetadata(name);
    router.push("/onboarding/project");
  };

  return (
    <div className="max-w-md w-full space-y-6">
      <h1 className="text-2xl font-bold text-center">Name your Workspace</h1>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded-lg text-black"
        placeholder="e.g. Acme Corp"
      />
      <button 
        onClick={handleNext}
        disabled={!name}
        className="w-full bg-blue-600 text-white p-3 rounded-lg disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}