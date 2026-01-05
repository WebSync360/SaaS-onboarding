"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Settings, 
  ChevronRight,
  Menu,
  X,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  
  // Logic for Dynamic Identity
  const userRole = user?.publicMetadata.role;
  const initial = user?.firstName?.charAt(0) || user?.username?.charAt(0) || "D";
  const displayName = user?.firstName ? `${user.firstName}'s Hub` : "DevBlaze";

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white border rounded-xl shadow-sm hover:bg-slate-50 transition-all"
      >
        {isOpen ? <X size={20} className="text-slate-600" /> : <Menu size={20} className="text-slate-600" />}
      </button>

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-100 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full">
          
          {/* Dynamic Header Section */}
          <div className="p-6">
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <span className="text-white font-bold text-lg uppercase tracking-tighter">
                  {initial}
                </span>
              </div>
              <div className="flex flex-col overflow-hidden">
                <h2 className="text-sm font-bold text-slate-900 tracking-tight truncate">
                  {displayName}
                </h2>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                  Workspace
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? "bg-blue-50/80 text-blue-600 shadow-sm ring-1 ring-blue-100/50" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={19} className={isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"} />
                    <span className="font-semibold text-sm tracking-tight">{item.name}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="text-blue-400" />}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Pro Card & Status */}
          <div className="p-4 mt-auto">
            <div className="bg-linear-to-b from-slate-50 to-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1 bg-amber-100 rounded-lg">
                  <Sparkles size={14} className="text-amber-600" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {userRole || 'Member'}
                </span>
              </div>
              
              <p className="text-sm font-bold text-slate-900 mb-1">Pro Plan</p>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                Unlock unlimited projects and collaborative team features.
              </p>
              
              <button className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-md shadow-slate-200 active:scale-[0.98]">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-30 md:hidden transition-all"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}