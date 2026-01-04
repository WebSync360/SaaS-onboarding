"use server";

import { UserRole } from "@/types/globals";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const saveRole = async (role: UserRole) => {
  const { userId } = await auth();
  if (!userId) return { error: "No user id found" };

  try {
    const client = await clerkClient();
    await client.users.updateUser(userId, {
      publicMetadata: { role },
    });
    return { success: true };
  } catch { // <--- No variable here, no ESLint error!
    return { error: "Failed to save role" };
  }
};

export const saveWorkspace = async (name: string) => {
  const { userId } = await auth();
  if (!userId) return { error: "No user id found" };

  try {
    const client = await clerkClient();
    await client.users.updateUser(userId, {
      publicMetadata: { workspaceName: name },
    });
    return { success: true };
  } catch { // <--- Removed variable
    return { error: "Failed to save workspace" };
  }
};

export const completeOnboarding = async (projectName: string) => {
  const { userId } = await auth();
  if (!userId) return { error: "No user id found" };

  try {
    const client = await clerkClient();
    await client.users.updateUser(userId, {
      publicMetadata: { 
        onboardingComplete: true,
        firstProjectName: projectName 
      },
    });
    return { message: "Onboarding complete" };
  } catch { // <--- Removed variable
    return { error: "Final step failed" };
  }
};