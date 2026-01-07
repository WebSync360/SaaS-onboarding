import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, Zap, Shield, LayoutGrid, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-700">
      {/* 1. Ambient Background Orbs (The "Aesthetic" Factor) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-indigo-50/50 blur-[100px]" />
      </div>

      {/* 2. Professional Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-100 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-lg font-bold tracking-tighter text-slate-900">FLUX</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="#features" className="hidden md:block text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Features</Link>
            <SignedIn>
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-sm font-semibold text-slate-900 px-4 py-2 hover:bg-slate-50 rounded-xl transition-all">Dashboard</Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-bold bg-slate-900 text-white px-5 py-2 rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
                  Join Now
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        {/* 3. Hero Section */}
        <section className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 animate-fade-in">
            <span className="text-[10px] font-bold uppercase tracking-widest">Version 2.0 is live</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Management that feels <br />
            <span className="bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">effortless.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            The workspace for elite developers. Sync your team, track your projects, and ship faster with Flux&apos;s intelligent dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <SignedIn>
              <Link 
                href="/dashboard" 
                className="group flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
              >
                Go to Dashboard
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </SignedIn>
            
            <SignedOut>
              <SignInButton mode="modal">
                <button className="group flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
                  Get Started for Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </SignInButton>
              <button className="px-8 py-4 bg-white text-slate-600 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50 transition-all">
                View Demo
              </button>
            </SignedOut>
          </div>
        </section>

        {/* 4. Feature Bento Grid (The "Pro" Look) */}
        <section id="features" className="max-w-6xl mx-auto mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Large Bento Item */}
            <div className="md:col-span-2 bg-slate-100 rounded-3xl p-8 border border-slate-100 flex flex-col justify-between group overflow-hidden relative">
               <div className="relative z-10">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                    <LayoutGrid className="text-blue-600" size={24} />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Multi-Workspace Sync</h3>
                 <p className="text-slate-500 max-w-xs">Manage multiple teams and projects with one single unified identity.</p>
               </div>
               <div className="absolute `-bottom-5` right-5 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl group-hover:bg-blue-200/50 transition-colors" />
            </div>

            {/* Small Bento Items */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between">
               <Zap className="text-amber-400 mb-6" size={32} fill="currentColor" />
               <div>
                 <h3 className="text-xl font-bold mb-2">Instant Setup</h3>
                 <p className="text-slate-400 text-sm">No complex config. Connect with Clerk and start shipping in seconds.</p>
               </div>
            </div>

            <div className="bg-slate-200 rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:border-blue-200 transition-all">
               <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="text-emerald-600" size={24} />
               </div>
               <div>
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Secure by Default</h3>
                 <p className="text-slate-500 text-sm">Enterprise-grade security powered by Supabase RLS policies............</p>
               </div>
            </div>

            <div className="md:col-span-2 bg-linear-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white flex items-center justify-between group overflow-hidden">
               <div className="max-w-sm">
                 <h3 className="text-2xl font-bold mb-2">Built for the Modern Web</h3>
                 <p className="text-indigo-100">Leverage Next.js 15, Tailwind v4, and the latest web standards for unparalleled speed.</p>
               </div>
               <div className="hidden md:block p-8 bg-white/10 rounded-full group-hover:scale-110 transition-transform">
                  <Sparkles size={48} />
               </div>
            </div>

          </div>
        </section>
      </main>

      {/* 5. Clean Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-sm font-bold text-slate-400">© 2026 FLUX WORKSPACES</span>
        <div className="flex gap-8 text-sm font-medium text-slate-500">
          <Link href="#" className="hover:text-blue-600 transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Terms</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Twitter</Link>
        </div>
      </footer>
    </div>
  );
}