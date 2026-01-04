import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to DevBlaze</h1>
      <div className="mt-8">
        <SignedIn>
          <Link href="/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
            Go to Dashboard.............
          </Link>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-black text-white rounded-lg">
              Get Started
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
}