import { HeartPulse, CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";

export default function HealthReportViewer({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="flex flex-col h-full animate-in slide-in-from-bottom-8 duration-500 min-h-screen bg-[#f2f2f7] dark:bg-black pt-14 px-5 pb-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onRestart} 
          className="text-[#007aff] dark:text-[#0a84ff] font-medium text-lg active:opacity-50 transition-opacity"
        >
          Done
        </button>
      </div>

      <h1 className="text-3xl font-bold text-black dark:text-white mb-6 tracking-tight px-1">
        Analysis
      </h1>

      <div className="space-y-4 flex-1">
        
        {/* Main Status Bento Box */}
        <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-6 shadow-apple">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold text-black dark:text-white tracking-tight">Healing Expected</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed mt-2">
            The wound is granulating well. Epithelialization observed at borders. Granulation tissue appears healthy with no visible purulence or erythema indicating infection.
          </p>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-5 shadow-apple flex flex-col justify-between">
            <h3 className="text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wider mb-2">Confidence</h3>
            <p className="text-3xl font-semibold text-black dark:text-white tracking-tighter">
              96<span className="text-lg text-gray-500">%</span>
            </p>
          </div>
          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-5 shadow-apple flex flex-col justify-between">
            <h3 className="text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wider mb-2">Area Est.</h3>
            <p className="text-3xl font-semibold text-black dark:text-white tracking-tighter">
              2.4<span className="text-lg text-gray-500 flex-1">cm²</span>
            </p>
          </div>
        </div>

        {/* Risk Alerts */}
        <div className="bg-[#fff4e5] dark:bg-orange-950/30 rounded-3xl p-6 shadow-apple border border-orange-100 dark:border-orange-900/50">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold text-orange-900 dark:text-orange-200">Notes</h3>
          </div>
          <ul className="space-y-2 text-sm text-orange-800 dark:text-orange-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
              Keep elevated to reduce localized swelling.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
              Change dressing daily to maintain moisture balance.
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}
