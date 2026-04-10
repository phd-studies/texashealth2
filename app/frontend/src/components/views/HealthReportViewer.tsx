import { RefreshCcw, FileText, ActivitySquare, ShieldAlert } from "lucide-react";

export default function HealthReportViewer({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="flex flex-col h-full animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-700/50">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          Analysis Complete
        </h2>
        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full border border-green-200 dark:border-green-800">
          Confidence: 94%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Main Findings */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700/80 shadow-sm">
            <h3 className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-3 text-sm">
              <ActivitySquare className="w-4 h-4 text-purple-500" />
              Clinical Summary
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              The AI model analyzed 240 frames of subject movement. Postural symmetry is within normal bounds. There are mild indications of constrained shoulder mobility on the right hemisphere during abduction. No acute physiological distress signs detected.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700">
                <span className="block text-slate-400 mb-1">Heart Rate Est.</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">76 BPM</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700">
                <span className="block text-slate-400 mb-1">Gait Flow</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Balanced</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Alerts */}
        <div className="space-y-4">
          <div className="bg-orange-50/50 dark:bg-orange-900/10 rounded-xl p-5 border border-orange-200 dark:border-orange-800/50 shadow-sm h-full">
            <h3 className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-3 text-sm">
              <ShieldAlert className="w-4 h-4 text-orange-500" />
              Observations
            </h3>
            <ul className="text-sm space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                <span className="text-slate-600 dark:text-slate-300 leading-tight">Right shoulder abduction limits at ~140° (expected 180°).</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 mt-1.5 shrink-0" />
                <span className="text-slate-500 dark:text-slate-400 leading-tight">Minor asymmetric weight distribution detected (L: 45%, R: 55%).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-auto flex justify-center pt-2">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
        >
          <RefreshCcw className="w-4 h-4" />
          New Assessment
        </button>
      </div>
    </div>
  );
}
