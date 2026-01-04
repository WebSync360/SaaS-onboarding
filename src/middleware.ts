import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 1. Define your route categories
const isPublicRoute = createRouteMatcher([
  "/",                         // Landing Page
  "/api/webhooks/clerk(.*)",   // Webhook (Required for Clerk to Supabase sync)
  "/sign-in(.*)", 
  "/sign-up(.*)"
]);

const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // 2. If the user is logged in, check their onboarding status from the Session Token
  const onboardingComplete = sessionClaims?.metadata?.onboardingComplete;

  // 3. Logic: If logged in but hasn't finished onboarding
  if (userId && !onboardingComplete && !isOnboardingRoute(req)) {
    return NextResponse.redirect(new URL("/onboarding/role", req.url));
  }

  // 4. Logic: If finished onboarding, don't let them go back to onboarding pages
  if (userId && onboardingComplete && isOnboardingRoute(req)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 5. Logic: Protect all other non-public routes
  if (!userId && !isPublicRoute(req)) {
    return (await auth()).redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};