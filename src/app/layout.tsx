import Sidebar from "@/components/dashboard/Sidebar";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims } = await auth();
  const userRole = sessionClaims?.metadata.role;

  return (
    <div className="flex h-screen bg-slate-50/50">
      {/* 1. SIDEBAR: Removed the 'hidden md:block' wrapper so it can handle its own mobile state */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* 2. HEADER: Adjusted padding for mobile to account for the hamburger button */}
        <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            {/* Added ml-12 on mobile only so text doesn't overlap the hamburger */}
            <div className="flex items-center gap-2 ml-12 md:ml-0">
              <h1 className="text-sm font-medium text-slate-400 hidden sm:block">Dashboard /</h1>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm ring-1 ring-blue-100/50">
                {userRole || "Member"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* You could add a Search input here later for a more 'filled' look */}
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        
        {/* 3. MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}