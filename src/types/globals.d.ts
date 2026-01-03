export {};

export type UserRole = "DESIGNER" | "DEVELOPER" | "UNKNOWN";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      role?: UserRole;
    };
  }

  interface UserPublicMetadata {
    onboardingComplete?: boolean;
    role?: UserRole;
    workspaceId?: string;
  }
}