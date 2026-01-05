"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // Add this
import { completeOnboarding } from "../_actions";

export default function ProjectPage() {
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser(); // Hook to manually reload user data
  const router = useRouter();

  const handleFinish = async () => {
    setLoading(true);
    
    try {
      const res = await completeOnboarding(projectName);

      if (res.message) {
        // 1. Force Clerk to re-fetch the user metadata from the server
        await user?.reload(); 
        
        // 2. Refresh the Next.js router cache
        router.refresh();

        // 3. Small delay to ensure the Middleware "sees" the new token
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } else {
        alert(res.error || "Final step failed.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 p-4 text-center">
      <h1 className="text-3xl font-bold">Name your first project</h1>
      <input
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="w-full p-3 border rounded-xl bg-white text-black"
        placeholder="e.g. My Awesome App"
      />
      <button
        onClick={handleFinish}
        disabled={!projectName || loading}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold"
      >
        {loading ? "Finalizing..." : "Finish & Enter Dashboard"}
      </button>
    </div>
  );
}