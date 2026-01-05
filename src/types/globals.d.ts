export {}

// This tells TypeScript exactly what is inside Clerk's metadata
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      role?: string;
      workspaceId?: string; // Added to track which workspace the user belongs to
      plan?: 'free' | 'pro'; // Useful for the "Pro Plan" UI we added
    };
  }

  interface UserPublicMetadata {
    onboardingComplete?: boolean;
    role?: string;
    workspaceId?: string;
    plan?: 'free' | 'pro';
  }
}