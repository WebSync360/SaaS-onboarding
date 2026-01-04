"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveWorkspace } from "../_actions"; // Changed from updateWorkspaceMetadata

export default function WorkspacePage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = async () => {
    setLoading(true);
    const result = await saveWorkspace(name);
    
    if (result.success) {
      router.push("/onboarding/project");
    } else {
      alert("Error saving workspace");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-6">
      <h1 className="text-2xl font-bold text-center text-slate-900">Name your Workspace</h1>
      <p className="text-center text-slate-500">This will be the home for all your projects.</p>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded-lg text-black bg-white focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="e.g. Acme Corp"
        disabled={loading}
      />
      <button 
        onClick={handleNext}
        disabled={!name || loading}
        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-blue-700 transition-colors"
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}