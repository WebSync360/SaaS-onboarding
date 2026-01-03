import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar Placeholder */}
      <aside className="w-64 border-r bg-white p-6 hidden md:block">
        <h2 className="text-xl font-bold text-blue-600">DevBlaze</h2>
        <nav className="mt-8 space-y-2">
          <div className="p-2 bg-blue-50 text-blue-700 rounded-md font-medium">Overview</div>
          <div className="p-2 text-slate-600 hover:bg-slate-50 rounded-md cursor-pointer transition-colors">Projects</div>
          <div className="p-2 text-slate-600 hover:bg-slate-50 rounded-md cursor-pointer transition-colors">Team</div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-white flex items-center justify-between px-8">
          <h1 className="text-sm font-medium text-slate-500">Workspace / Overview</h1>
          <UserButton afterSignOutUrl="/" />
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}