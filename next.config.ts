export {}

// This tells TypeScript exactly what is inside Clerk's metadata
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      role?: string;
    };
  }

  interface UserPublicMetadata {
    onboardingComplete?: boolean;
    role?: string;
  }
}