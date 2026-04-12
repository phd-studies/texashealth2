import { Camera, Activity, FileStack, ChevronRight } from "lucide-react";

export default function AppDashboard({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 pt-16 px-5 pb-8 min-h-screen">
      
      {/* Apple Health style Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white tracking-tight leading-tight">
            Summary
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-1">
            Wound Management
          </p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 w-10 h-10 rounded-full flex items-center justify-center border border-red-100 dark:border-red-900 shadow-sm">
          <Activity className="text-red-500 w-5 h-5" />
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        
        {/* Status Card */}
        <div className="col-span-2 bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-6 shadow-apple flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-1 uppercase tracking-wider">Status</h3>
            <p className="text-2xl font-semibold text-black dark:text-white tracking-tight">Active Tracking</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Wound History Card */}
        <div className="col-span-2 bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-6 shadow-apple flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm uppercase tracking-wider">History</h3>
            <FileStack className="w-5 h-5 text-gray-300 dark:text-gray-600" />
          </div>
          <div className="flex-1 flex items-end justify-between">
            <div>
              <p className="text-lg font-semibold text-black dark:text-white">No logs yet</p>
              <p className="text-gray-400 text-sm mt-0.5">Start your first assessment</p>
            </div>
          </div>
        </div>

      </div>

      {/* Primary CTA fixed to bottom */}
      <div className="mt-6 mb-6">
        <button
          onClick={onStart}
          className="w-full bg-[#007aff] dark:bg-[#0a84ff] hover:opacity-90 active:scale-[0.98] transition-all duration-200 text-white font-semibold rounded-2xl py-4 flex items-center justify-center shadow-apple shadow-blue-500/20"
        >
          <Camera className="w-5 h-5 mr-2" />
          <span className="text-lg tracking-wide">Take a Photo</span>
        </button>
      </div>

    </div>
  );
}
