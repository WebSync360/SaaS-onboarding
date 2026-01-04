import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center bg-white border-b">
        <span className="text-xl font-bold text-blue-600">FLUX</span>
        <div>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      <main className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
          Build faster with <span className="text-blue-600">Flux</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-lg mx-auto">
          The all-in-one workspace for developers and designers to manage projects seamlessly.
        </p>

        <div className="flex gap-4 justify-center">
          <SignedIn>
            <Link 
              href="/dashboard" 
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all"
            >
              Enter Dashboard
            </Link>
          </SignedIn>
          
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-zinc-800 transition-all">
                Get Started for Free
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </main>
    </div>
  );
}