import fs from 'fs';
import path from 'path';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { ChevronLeft, AlertTriangle, Activity, Target } from "lucide-react";
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
  // Our repo root relative to this file running in Next API is quite a few dirs up...
  // Alternatively, process.cwd() gives the Next.js app root (`app/frontend`). So we go up 2 levels.
  const rootDir = path.resolve(process.cwd(), '../../');
  const csvPath = path.join(rootDir, 'evaluation_results.csv');

  let rawData = "";
  try {
    rawData = fs.readFileSync(csvPath, 'utf8');
  } catch (error) {
    console.error("Failed to read CSV:", error);
    rawData = "image,day,wound_px,area_change,G,S,N\nO,0,0,0,0,0,0"; // Failsafe fallback
  }

  // Extremely simple CSV parse
  const lines = rawData.trim().split('\n');
  const data: OutData[] = [];
  
  if (lines.length > 1) {
    // skip header line
    for (let i = 1; i < lines.length; i++) {
        const p = lines[i].split(",");
        if(p.length >= 7) {
            data.push({
                image: p[0],
                day: parseInt(p[1], 10),
                wound_px: parseInt(p[2], 10),
                area_change: parseFloat(p[3]),
                granulation: parseFloat(p[4]),
                slough: parseFloat(p[5]),
                necrosis: parseFloat(p[6])
            });
        }
    }
  }

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
              <div className="bg-[#007aff]/10 text-[#007aff] dark:bg-[#0a84ff]/20 dark:text-[#0a84ff] text-xs font-bold px-3 py-1 rounded-full px-2">
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

          {/* Size Metrics */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-5 shadow-apple flex flex-col justify-center gap-1">
                <Activity className="w-5 h-5 text-orange-500 mb-1" />
                <p className="text-3xl font-bold text-black dark:text-white tracking-tight">{Math.round(day28?.area_change || 0)}%</p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Area Increase</p>
             </div>
             <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-5 shadow-apple flex flex-col justify-center gap-1">
                <AlertTriangle className="w-5 h-5 text-red-500 mb-1" />
                <p className="text-3xl font-bold text-black dark:text-white tracking-tight">{Math.round((day28?.slough || 0) * 100) + Math.round((day28?.necrosis || 0) * 100)}%</p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Unhealthy</p>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
