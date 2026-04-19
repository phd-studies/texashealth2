"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

// The timeline for 11 tracked test_photos (Day 0 to Day 10)
const data = [
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
];

export default function HowItWorksPage() {
  const [activeDay, setActiveDay] = useState(0);

  const handleNext = () => {
    setActiveDay((prev) => Math.min(prev + 1, data.length - 1));
  };
  const handlePrev = () => {
    setActiveDay((prev) => Math.max(prev - 1, 0));
  };

  const currentData = data[activeDay];

  // format day string for image
  const dayStr = activeDay.toString().padStart(2, "0");
  const imgPath = `/test_photos/1363_worsening_day${dayStr}.png`;

  const gPercent = Math.round(currentData.granulation * 100);
  const sPercent = Math.round(currentData.slough * 100);
  const nPercent = Math.round(currentData.necrosis * 100);

  return (
    <div className="min-h-screen flex justify-center bg-[#f2f2f7] dark:bg-black">
      <main className="w-full max-w-md bg-[#f2f2f7] dark:bg-black min-h-screen shadow-2xl shadow-black/5 flex flex-col relative overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#f2f2f7]/80 dark:bg-black/80 backdrop-blur-md px-5 pt-12 pb-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
          <Link href="/report" className="flex items-center text-[#007aff] dark:text-[#0a84ff] font-medium active:opacity-70 transition-opacity">
            <ChevronLeft className="w-5 h-5 -ml-1 mr-0.5" />
            Report
          </Link>
          <span className="font-semibold text-black dark:text-white">How It Works</span>
          <div className="w-16" /> {/* Spacer */}
        </div>

        <div className="px-5 pt-6 pb-12 flex flex-col gap-6 animate-in fade-in duration-500">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black dark:text-white tracking-tight mb-2">Interactive AI Analysis</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Use the slider to step through the days and see our AI precisely separate wound tissues.
            </p>
          </div>

          {/* Slider Core Container */}
          <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-5 shadow-apple flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between mb-4">
              <button 
                onClick={handlePrev}
                disabled={activeDay === 0}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all text-black dark:text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="font-bold text-black dark:text-white">Day {activeDay}</h2>
              <button 
                onClick={handleNext}
                disabled={activeDay === data.length - 1}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all text-black dark:text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full aspect-square bg-black rounded-2xl overflow-hidden shadow-inner flex items-center justify-center mb-6 relative">
              <img 
                src={imgPath} 
                alt={`Wound Day ${activeDay}`} 
                className="w-full h-full object-contain animate-in fade-in duration-300"
                key={imgPath} // Force re-render animation when img path changes
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-gray-700">
                 <span className="text-white text-xs font-bold tracking-wider">{currentData.wound_px} PX AREA</span>
              </div>
            </div>

            {/* Dynamic Data Plotting */}
            <div className="w-full space-y-4">
               <div>
                  <div className="flex justify-between text-sm font-semibold mb-1">
                    <span className="text-[#ff2d55]">Granulation</span>
                    <span className="text-black dark:text-white">{gPercent}%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#ff2d55] transition-all duration-500 ease-out rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" 
                      style={{ width: `${gPercent}%` }} 
                    />
                  </div>
               </div>

               <div>
                  <div className="flex justify-between text-sm font-semibold mb-1">
                    <span className="text-[#ffcc00]">Slough</span>
                    <span className="text-black dark:text-white">{sPercent}%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#ffcc00] transition-all duration-500 ease-out rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" 
                      style={{ width: `${Math.max(sPercent, 2)}%` }} 
                    />
                  </div>
               </div>

               <div>
                  <div className="flex justify-between text-sm font-semibold mb-1">
                    <span className="text-gray-700 dark:text-gray-400">Necrosis</span>
                    <span className="text-black dark:text-white">{nPercent}%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gray-800 dark:bg-gray-400 transition-all duration-500 ease-out rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" 
                      style={{ width: `${Math.max(nPercent, 2)}%` }} 
                    />
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-[#007aff]/5 dark:bg-[#0a84ff]/10 rounded-[2rem] p-6 border border-[#007aff]/10">
            <h3 className="font-bold text-[#007aff] dark:text-[#0a84ff] mb-2">Why It Matters</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Our models don't just guess the wound size. As seen in the sliding timeline, the AI tracks pixel-by-pixel shifts in critical tissue types (like necrosis expansion between Day 6 and Day 10). This unlocks true predictive healthcare.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
