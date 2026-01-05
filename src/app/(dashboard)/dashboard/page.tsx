import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import CreateProjectForm from "@/components/CreateProjectForm";
import { Folder, Clock, CheckCircle2, ShieldCheck, Plus } from "lucide-react";

export default async function DashboardPage() {
  // 1. Logic: Scoped inside the async function to prevent Server Component errors
  const { userId, sessionClaims } = await auth();
  const userRole = sessionClaims?.metadata.role || "Member";

  // 2. Database: Initialize Supabase Client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 3. Data Fetching
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("workspace_id", userId)
    .order("created_at", { ascending: false });

  // 4. Computed Stats
  const stats = [
    { 
      label: "Total Projects", 
      value: projects?.length || 0, 
      icon: Folder, 
      color: "text-blue-600", 
      bg: "bg-blue-50/50" 
    },
    { 
      label: "Active Projects", 
      value: projects?.filter(p => p.status === 'active').length || 0, 
      icon: Clock, 
      color: "text-amber-600", 
      bg: "bg-amber-50/50" 
    },
    { 
      label: "Completed", 
      value: 0, // Logic for completed can be added as status === 'completed'
      icon: CheckCircle2, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50/50" 
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* A. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100/50 rounded-full shadow-xs">
              <ShieldCheck size={12} className="text-blue-600" />
              <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">
                {userRole}
              </span>
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            Welcome back to your command center. Here is the latest data.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
           <CreateProjectForm />
        </div>
      </div>

      {/* B. Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md hover:translate-y-0.5 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color} shadow-inner`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 mt-0.5">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* C. Projects Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Recent Projects
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
              {projects?.length || 0}
            </span>
          </h2>
        </div>

        {projects?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100 group transition-colors hover:border-blue-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <div className="relative">
                <Folder className="text-slate-200" size={40} />
                <Plus className="absolute -top-2 -right-2 text-blue-500" size={20} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900">No active projects</h3>
            <p className="text-slate-500 text-sm max-w-xs text-center mt-2 leading-relaxed">
              Ready to ship something great? Create your first project to begin tracking progress.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project) => (
              <div 
                key={project.id} 
                className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative overflow-hidden"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-blue-50 to-transparent -mr-12 -mt-12 rounded-full transition-transform group-hover:scale-150" />

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Folder size={22} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                    project.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100' 
                      : 'bg-slate-50 text-slate-400 ring-1 ring-slate-100'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-3 text-slate-400">
                    <Clock size={12} />
                    <p className="text-[11px] font-medium">
                      Added {new Date(project.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}