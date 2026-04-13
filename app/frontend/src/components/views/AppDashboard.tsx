import { Camera, Activity, FileStack, ChevronRight } from "lucide-react";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function AppDashboard({ onStart }: { onStart: () => void }) {
  const { isLoaded, isSignedIn } = useAuth();
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
        <div className="flex items-center gap-3">
          {!isLoaded ? null : isSignedIn ? (
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 border border-gray-200 dark:border-gray-800"
                }
              }}
            />
          ) : (
            <div className="border border-[#007aff] text-[#007aff] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#007aff]/10 transition-colors">
              <SignInButton mode="modal" />
            </div>
          )}
        </div>
      </div>

      {/* Bento Grid - Main Status */}
      <div className="grid grid-cols-2 gap-4">
        
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

      {/* Urgency Statistics Grid */}
      <div className="mt-8 flex-1">
        <h2 className="text-xl font-bold text-black dark:text-white tracking-tight mb-4 px-1">
          Why It Matters
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-5 shadow-apple flex flex-col justify-between">
            <h3 className="text-gray-500 dark:text-gray-400 font-semibold text-[10px] uppercase tracking-wider mb-2">Global Cases</h3>
            <p className="text-3xl font-bold text-black dark:text-white tracking-tighter">
              18.6<span className="text-lg text-gray-500 font-semibold ml-1">M</span>
            </p>
            <p className="text-gray-400 text-xs mt-1 font-medium">annually</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-5 shadow-apple flex flex-col justify-between">
            <h3 className="text-gray-500 dark:text-gray-400 font-semibold text-[10px] uppercase tracking-wider mb-2">Amputation Rate</h3>
            <p className="text-3xl font-bold text-black dark:text-white tracking-tighter">
              30<span className="text-lg text-gray-500 font-semibold ml-1">sec</span>
            </p>
            <p className="text-gray-500 text-xs mt-1 font-medium leading-tight">1 amputation globally</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-5 shadow-apple flex flex-col justify-between">
            <h3 className="text-gray-500 dark:text-gray-400 font-semibold text-[10px] uppercase tracking-wider mb-2">5-Yr Mortality</h3>
            <p className="text-3xl font-bold text-black dark:text-white tracking-tighter">
              40-70<span className="text-lg text-gray-500 font-semibold">%</span>
            </p>
            <p className="text-gray-400 text-xs mt-1 font-medium">post-amputation</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-5 shadow-apple flex flex-col justify-between">
            <h3 className="text-gray-500 dark:text-gray-400 font-semibold text-[10px] uppercase tracking-wider mb-2">Global Costs</h3>
            <p className="text-3xl font-bold text-black dark:text-white tracking-tighter">
              $96.8<span className="text-lg text-gray-500 font-semibold ml-1">B</span>
            </p>
            <p className="text-gray-400 text-xs mt-1 font-medium">medical costs</p>
          </div>
        </div>
      </div>

      {/* Primary CTA fixed to bottom */}
      <div className="mt-6 mb-6">
        {(!isLoaded) ? null : isSignedIn ? (
          <Link
            href="/dashboard"
            className="w-full bg-[#007aff] dark:bg-[#0a84ff] hover:opacity-90 active:scale-[0.98] transition-all duration-200 text-white font-semibold rounded-2xl py-4 flex items-center justify-center shadow-apple shadow-blue-500/20"
          >
            <span className="text-lg tracking-wide">Go to Dashboard</span>
            <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        ) : (
          <button
            onClick={onStart}
            className="w-full bg-[#007aff] dark:bg-[#0a84ff] hover:opacity-90 active:scale-[0.98] transition-all duration-200 text-white font-semibold rounded-2xl py-4 flex items-center justify-center shadow-apple shadow-blue-500/20"
          >
            <Camera className="w-5 h-5 mr-2" />
            <span className="text-lg tracking-wide">Take a Photo</span>
          </button>
        )}
      </div>

    </div>
  );
}
