"use server";

import { UserRole } from "@/types/globals";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    return { error: "No user id found" };
  }

  const role = formData.get("role") as UserRole | undefined;

  try {
    const client = await clerkClient();
    
    // Update the user's metadata in Clerk
    await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        role: role ?? undefined,
      },
    });

    return { message: "Onboarding complete" };
  } catch (err) {
    console.error("Clerk Error:", err);
    return { error: "There was an error updating your profile" };
  }
};