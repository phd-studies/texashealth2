import { ChevronRight, ShieldCheck, Activity, Brain } from "lucide-react";

export default function AppDashboard({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in duration-500 flex-1 py-8">
      <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 border border-blue-500/20 shadow-inner">
        <Activity className="w-10 h-10 text-blue-600 dark:text-blue-400" />
      </div>
      
      <div className="space-y-4 max-w-lg">
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 tracking-tight">
          Welcome to HealthScreen Pro
        </h1>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
          Advanced clinical analysis leveraging AI and biomechanical computer vision to provide rapid, trustworthy insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl pb-6">
        <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-start gap-4">
          <Brain className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
          <div className="text-left">
            <h3 className="font-medium text-slate-700 dark:text-slate-200 text-sm">AI-Powered</h3>
            <p className="text-xs text-slate-500 mt-1">Deep learning evaluates subtle biomechanical markers instantly.</p>
          </div>
        </div>
        <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
          <div className="text-left">
            <h3 className="font-medium text-slate-700 dark:text-slate-200 text-sm">Secure & Private</h3>
            <p className="text-xs text-slate-500 mt-1">All processing happens directly within your secure environment.</p>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-md hover:shadow-lg"
      >
        Start Screening
        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
