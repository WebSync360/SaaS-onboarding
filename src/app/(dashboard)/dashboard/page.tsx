import { auth, currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import CreateProjectForm from "@/components/CreateProjectForm";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch projects for this specific user/workspace
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("workspace_id", userId)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-2xl border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
          <p className="text-slate-500">Manage and track your active initiatives.</p>
        </div>
        <div className="w-full md:w-auto">
           <CreateProjectForm />
        </div>
      </div>

      <div className="grid gap-4">
        {projects?.length === 0 ? (
          <div className="text-center p-12 bg-slate-100 rounded-xl border-2 border-dashed">
            <p className="text-slate-500">No projects yet. Create your first one above!</p>
          </div>
        ) : (
          projects?.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-xl border shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900">{project.name}</h3>
                <p className="text-xs text-slate-400 mt-1 uppercase">ID: {project.id.slice(0, 8)}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">
                {project.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}