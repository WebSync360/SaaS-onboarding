"use server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const name = formData.get("name") as string;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Insert project linked to the user's workspace ID (which is the Clerk ID)
  const { error } = await supabase
    .from("projects")
    .insert({
      workspace_id: userId,
      name: name,
      status: "active",
    });

  if (error) {
    console.error("Project Create Error:", error.message);
    return { error: "Failed to create project" };
  }

  // Refresh the page data without a full reload
  revalidatePath("/dashboard");
  return { success: true };
}