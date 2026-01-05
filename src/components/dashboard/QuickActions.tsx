// src/components/dashboard/QuickActions.tsx
import { Plus, Users, Settings, Zap } from "lucide-react";

const actions = [
  { 
    title: "New Project", 
    desc: "Launch a new workspace", 
    icon: Plus, 
    color: "bg-blue-600", 
    shadow: "shadow-blue-200" 
  },
  { 
    title: "Invite Team", 
    desc: "Add your collaborators", 
    icon: Users, 
    color: "bg-indigo-600", 
    shadow: "shadow-indigo-200" 
  },
  { 
    title: "Automation", 
    desc: "Setup project triggers", 
    icon: Zap, 
    color: "bg-amber-500", 
    shadow: "shadow-amber-200" 
  },
  { 
    title: "Workspace", 
    desc: "Manage your settings", 
    icon: Settings, 
    color: "bg-slate-700", 
    shadow: "shadow-slate-200" 
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => (
        <button
          key={action.title}
          className="group p-4 bg-white border border-slate-100 rounded-2xl text-left hover:border-blue-200 hover:shadow-lg transition-all active:scale-[0.98]"
        >
          <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center text-white shadow-lg ${action.shadow} mb-4 group-hover:scale-110 transition-transform`}>
            <action.icon size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">{action.title}</h3>
          <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{action.desc}</p>
        </button>
      ))}
    </div>
  );
}