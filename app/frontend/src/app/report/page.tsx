
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { ChevronLeft, AlertTriangle, Activity, Target, Stethoscope, ClipboardList, Microscope } from "lucide-react";
import WoundProgressChart from "@/components/WoundProgressChart";

// Type matching our parsed CSV
type OutData = {
  image: string;
  day: number;
  wound_px: number;
  area_change: number;
  granulation: number;
  slough: number;
  necrosis: number;
};

export default async function ReportPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Read the CSV file directly from the repo root
  const data: OutData[] = [
    { day: 0, area_change: 0.0, granulation: 0.928, slough: 0.0302, necrosis: 0.0418, wound_px: 5643, image: "1363" },
    { day: 1, area_change: 0.0, granulation: 0.9289, slough: 0.0295, necrosis: 0.0416, wound_px: 5643, image: "1363" },
    { day: 2, area_change: 0.0, granulation: 0.927, slough: 0.0315, necrosis: 0.0415, wound_px: 5643, image: "1363" },
    { day: 3, area_change: 0.0, granulation: 0.9279, slough: 0.0308, necrosis: 0.0413, wound_px: 5643, image: "1363" },
    { day: 4, area_change: 0.0, granulation: 0.9297, slough: 0.0297, necrosis: 0.0406, wound_px: 5643, image: "1363" },
    { day: 5, area_change: 6.17, granulation: 0.9374, slough: 0.0249, necrosis: 0.0377, wound_px: 5991, image: "1363" },
    { day: 6, area_change: 6.17, granulation: 0.9366, slough: 0.0246, necrosis: 0.0388, wound_px: 5991, image: "1363" },
    { day: 7, area_change: 6.17, granulation: 0.9354, slough: 0.0246, necrosis: 0.04, wound_px: 5991, image: "1363" },
    { day: 8, area_change: 6.17, granulation: 0.9341, slough: 0.0248, necrosis: 0.0411, wound_px: 5991, image: "1363" },
    { day: 9, area_change: 6.17, granulation: 0.9324, slough: 0.025, necrosis: 0.0426, wound_px: 5991, image: "1363" },
    { day: 10, area_change: 12.46, granulation: 0.9316, slough: 0.0241, necrosis: 0.0442, wound_px: 6346, image: "1363" },
    { day: 11, area_change: 12.46, granulation: 0.9299, slough: 0.024, necrosis: 0.046, wound_px: 6346, image: "1363" },
    { day: 12, area_change: 12.46, granulation: 0.9274, slough: 0.024, necrosis: 0.0486, wound_px: 6346, image: "1363" },
    { day: 13, area_change: 12.46, granulation: 0.9241, slough: 0.024, necrosis: 0.0519, wound_px: 6346, image: "1363" },
    { day: 14, area_change: 18.89, granulation: 0.9213, slough: 0.0236, necrosis: 0.0551, wound_px: 6709, image: "1363" },
    { day: 15, area_change: 18.89, granulation: 0.9162, slough: 0.0238, necrosis: 0.06, wound_px: 6709, image: "1363" },
    { day: 16, area_change: 18.89, granulation: 0.9104, slough: 0.0245, necrosis: 0.0651, wound_px: 6709, image: "1363" },
    { day: 17, area_change: 18.89, granulation: 0.9046, slough: 0.0255, necrosis: 0.0699, wound_px: 6709, image: "1363" },
    { day: 18, area_change: 18.89, granulation: 0.8989, slough: 0.0267, necrosis: 0.0745, wound_px: 6709, image: "1363" },
    { day: 19, area_change: 25.47, granulation: 0.8948, slough: 0.0269, necrosis: 0.0783, wound_px: 7080, image: "1363" },
    { day: 20, area_change: 25.47, granulation: 0.8896, slough: 0.028, necrosis: 0.0824, wound_px: 7080, image: "1363" },
    { day: 21, area_change: 25.47, granulation: 0.8841, slough: 0.0296, necrosis: 0.0863, wound_px: 7080, image: "1363" },
    { day: 22, area_change: 25.47, granulation: 0.8772, slough: 0.0323, necrosis: 0.0905, wound_px: 7080, image: "1363" },
    { day: 23, area_change: 32.15, granulation: 0.8727, slough: 0.0372, necrosis: 0.0901, wound_px: 7457, image: "1363" },
    { day: 24, area_change: 32.15, granulation: 0.833, slough: 0.0504, necrosis: 0.1166, wound_px: 7457, image: "1363" },
    { day: 25, area_change: 32.15, granulation: 0.7584, slough: 0.0686, necrosis: 0.1731, wound_px: 7457, image: "1363" },
    { day: 26, area_change: 32.15, granulation: 0.6586, slough: 0.0857, necrosis: 0.2557, wound_px: 7457, image: "1363" },
    { day: 27, area_change: 32.15, granulation: 0.5351, slough: 0.0975, necrosis: 0.3674, wound_px: 7457, image: "1363" },
    { day: 28, area_change: 38.97, granulation: 0.4975, slough: 0.0972, necrosis: 0.4053, wound_px: 7842, image: "1363" },
  ];

  // Get start and end comparisons
  const day0 = data.find(d => d.day === 0);
  const day28 = data.find(d => d.day === 28);
  
  // Hardcoded diagnosis state as requested
  const isWorsening = true;

  return (
    <div className="min-h-screen flex justify-center bg-[#f2f2f7] dark:bg-black">
      <main className="w-full max-w-md bg-[#f2f2f7] dark:bg-black min-h-screen shadow-2xl shadow-black/5 flex flex-col relative overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#f2f2f7]/80 dark:bg-black/80 backdrop-blur-md px-5 pt-12 pb-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
          <Link href="/dashboard" className="flex items-center text-[#007aff] dark:text-[#0a84ff] font-medium active:opacity-70 transition-opacity">
            <ChevronLeft className="w-5 h-5 -ml-1 mr-0.5" />
            Dashboard
          </Link>
          <span className="font-semibold text-black dark:text-white">Analysis</span>
          <div className="w-16" /> {/* Spacer */}
        </div>

        <div className="flex-1 px-5 pb-12 pt-6 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Main Hero Card */}
          <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-6 shadow-apple relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
            
            <div className="flex items-start justify-between mb-4 mt-2">
              <div>
                <h1 className="text-2xl font-bold text-black dark:text-white tracking-tight mb-1">
                  Wound Diagnostics
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                  Diabetic Foot Ulcer • 28 Day Tracking
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="text-red-500 dark:text-red-400 w-6 h-6" />
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 border border-red-100 dark:border-red-900/50 mt-4">
              <h3 className="font-bold text-red-800 dark:text-red-300 text-[15px] flex items-center mb-2">
                <Target className="w-4 h-4 mr-1.5" />
                Critical Assessment
              </h3>
              <p className="text-red-700/90 dark:text-red-200/80 text-sm leading-relaxed">
                Analysis of the past 28 days indicates a <strong>worsening ulcer</strong>. 
                Healthy granulation tissue has decreased significantly from {Math.round((day0?.granulation || 0) * 100)}% to {Math.round((day28?.granulation || 0) * 100)}%. 
                Concurrently, necrotic (dead) tissue has expanded to {Math.round((day28?.necrosis || 0) * 100)}%, indicating severe localized ischemia. Immediate clinical intervention is recommended.
              </p>
            </div>
          </div>

          {/* Chart Card */}
          <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-6 shadow-apple">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black dark:text-white tracking-tight">Tissue Progression</h2>
              <div className="bg-[#007aff]/10 text-[#007aff] dark:bg-[#0a84ff]/20 dark:text-[#0a84ff] text-xs font-bold py-1 rounded-full px-3">
                AI Assessed
              </div>
            </div>
            
            <div className="-mx-2">
                <WoundProgressChart data={data} />
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 justify-center">
              <div className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">
                <div className="w-3 h-3 rounded-full bg-[#ff2d55] mr-1.5 opacity-80" /> Granulation
              </div>
              <div className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">
                <div className="w-3 h-3 rounded-full bg-[#ffcc00] mr-1.5 opacity-80" /> Slough
              </div>
              <div className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">
                <div className="w-3 h-3 rounded-full bg-[#000000] dark:bg-gray-400 mr-1.5 opacity-80" /> Necrosis
              </div>
            </div>
          </div>

          {/* Educational Call to Action */}
          <Link href="/how-it-works" className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-[1.5rem] p-4 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700 active:scale-[0.98] mt-2 mb-2 group">
            <div className="flex items-center text-[#007aff] dark:text-[#0a84ff] font-bold tracking-tight">
              Interactive Image Timeline
            </div>
            <p className="text-xs text-gray-500 mt-1">See the AI parse test photos day-by-day</p>
          </Link>

          <div className="grid grid-cols-2 gap-4">
             {/* Clinical Analysis Metrics */}
             <div className="col-span-2 bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-6 shadow-apple">
               <h3 className="text-lg font-bold text-black dark:text-white tracking-tight flex items-center mb-4">
                 <Microscope className="w-5 h-5 mr-2 text-purple-500" />
                 Pathology Overview
               </h3>
               <div className="space-y-4">
                 <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
                   <span className="text-gray-500 dark:text-gray-400 font-medium">Trajectory</span>
                   <span className="text-red-500 font-bold bg-red-50 dark:bg-red-900/20 px-2.5 py-0.5 rounded-full text-sm">Worsening</span>
                 </div>
                 <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
                   <span className="text-gray-500 dark:text-gray-400 font-medium">Area Growth (28d)</span>
                   <span className="text-black dark:text-white font-bold">+{Math.round(day28?.area_change || 0)}% Expansion</span>
                 </div>
                 <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
                   <span className="text-gray-500 dark:text-gray-400 font-medium">Slough/Necrosis Level</span>
                   <span className="text-red-500 font-bold">Critical Threshold</span>
                 </div>
               </div>
             </div>

             {/* Action Plan */}
             <div className="col-span-2 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-[2rem] p-6 shadow-apple">
               <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 tracking-tight flex items-center mb-4">
                 <ClipboardList className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                 Recommended Care Plan
               </h3>
               <ul className="space-y-3">
                 <li className="flex items-start">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 shrink-0" />
                   <span className="text-blue-800 dark:text-blue-200 text-sm">Urgent referral to podiatry for advanced debridement of necrotic tissues.</span>
                 </li>
                 <li className="flex items-start">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 shrink-0" />
                   <span className="text-blue-800 dark:text-blue-200 text-sm">Initiate broad-spectrum oral antibiotics pending culture results due to systemic risk.</span>
                 </li>
                 <li className="flex items-start">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 shrink-0" />
                   <span className="text-blue-800 dark:text-blue-200 text-sm">Strict off-loading of the affected extremity and vascular assessment testing.</span>
                 </li>
               </ul>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
