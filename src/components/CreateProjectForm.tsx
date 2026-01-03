"use client";

import { useState } from "react";
import { createProject } from "@/app/(dashboard)/dashboard/_project_actions";

export default function CreateProjectForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await createProject(formData);

    if (result.success) {
      (event.target as HTMLFormElement).reset();
    } else {
      alert(result.error);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        name="name"
        required
        placeholder="New Project Name..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {loading ? "Adding..." : "Add Project"}
      </button>
    </form>
  );
}