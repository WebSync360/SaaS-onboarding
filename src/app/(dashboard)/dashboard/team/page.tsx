import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import CreateProjectForm from "@/components/CreateProjectForm";
import { Folder, Clock, CheckCircle2 } from "lucide-react";

export default async function DashboardPage() {
  const { userId, sessionClaims } = await auth();
  const userRole = sessionClaims?.metadata.role;
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("workspace_id", userId)
    .order("created_at", { ascending: false });

  const stats = [
    { label: "Total Projects", value: projects?.length || 0, icon: Folder, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active", value: projects?.filter(p => p.status === 'active').length || 0, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Completed", value: 0, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 mt-1">
            Welcome back, <span className="text-blue-600 font-semibold uppercase text-xs tracking-tighter">{userRole || 'User'}</span>! 
            Here&apos;s what is happening today.
          </p>
        </div>
        <CreateProjectForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {!projects || projects.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Folder className="text-slate-300" size={32} />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No projects yet</h3>
              <p className="text-slate-500 max-w-xs mx-auto mt-2">Get started by creating your first project with the button above.</p>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <Folder className="text-slate-400 group-hover:text-blue-500" size={20} />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    project.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {project.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2">
                  Created {new Date(project.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}