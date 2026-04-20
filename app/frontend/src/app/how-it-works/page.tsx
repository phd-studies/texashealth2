"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import WoundProgressChart from "@/components/WoundProgressChart";

// The timeline for 28 tracked items
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

// Map of the actual physical files available in the test_photos directory
const availableDayOffsets = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,25,26,28];

export default function HowItWorksPage() {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play interval mechanics
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setSliderIndex((prev) => {
          if (prev >= availableDayOffsets.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 700); // 700ms tick for smooth transitions
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => setSliderIndex((prev) => Math.min(prev + 1, availableDayOffsets.length - 1));
  const handlePrev = () => setSliderIndex((prev) => Math.max(prev - 1, 0));
  const togglePlay = () => setIsPlaying(!isPlaying);

  const activeDay = availableDayOffsets[sliderIndex];
  const currentData = data.find(d => d.day === activeDay) || data[0];

  const dayStr = activeDay.toString().padStart(2, "0");
  const imgPath = `/test_photos/1363_worsening_day${dayStr}.png`;

  const gPercent = Math.round(currentData.granulation * 100);
  const sPercent = Math.round(currentData.slough * 100);
  const nPercent = Math.round(currentData.necrosis * 100);

  // Time-series dynamic chart 
  const slicedData = data.slice(0, activeDay + 1);

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
          <div className="w-16" />
        </div>

        <div className="px-5 pt-6 pb-12 flex flex-col gap-6 animate-in fade-in duration-500">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black dark:text-white tracking-tight mb-2">Interactive AI Analysis</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm px-2">
              Step through the timeline or press Play to watch our AI track tissue necrosis.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-5 shadow-apple flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between mb-4">
              <button 
                onClick={handlePrev}
                disabled={sliderIndex === 0 || isPlaying}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all text-black dark:text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col items-center justify-center">
                <h2 className="font-bold text-black dark:text-white text-lg">Day {activeDay}</h2>
              </div>
              
              <button 
                onClick={handleNext}
                disabled={sliderIndex === availableDayOffsets.length - 1 || isPlaying}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all text-black dark:text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button 
              onClick={togglePlay}
              className={`mb-5 px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-all shadow-sm ${
                isPlaying 
                  ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" 
                  : "bg-[#007aff]/10 text-[#007aff] dark:bg-[#0a84ff]/20 dark:text-[#0a84ff]"
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              {isPlaying ? "PAUSE" : "PLAY ALL"}
            </button>

            <div className="w-full aspect-square bg-black rounded-2xl overflow-hidden shadow-inner flex items-center justify-center mb-6 relative">
              <img 
                src={imgPath} 
                alt={`Wound Day ${activeDay}`} 
                className={`w-full h-full object-contain ${!isPlaying ? "animate-in fade-in duration-300" : ""}`}
                key={imgPath}
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-gray-700">
                 <span className="text-white text-xs font-bold tracking-wider">{currentData.wound_px} PX AREA</span>
              </div>
            </div>

            <div className="w-full space-y-4">
               {/* Time Series Real Time Plot */}
               <div className="mb-6 -mx-2 bg-gray-50 dark:bg-black/50 border border-gray-100 dark:border-gray-800 rounded-2xl pt-2 pb-1 transition-all">
                 <h3 className="text-center text-[10px] font-bold text-gray-400 tracking-widest mt-2 mb-1">REAL-TIME TRACE</h3>
                 <WoundProgressChart data={slicedData} />
               </div>

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
                    <span className="text-[#a855f7]">Necrosis</span>
                    <span className="text-black dark:text-white">{nPercent}%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#a855f7] transition-all duration-500 ease-out rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" 
                      style={{ width: `${Math.max(nPercent, 2)}%` }} 
                    />
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-[#007aff]/5 dark:bg-[#0a84ff]/10 rounded-[2rem] p-6 border border-[#007aff]/10">
            <h3 className="font-bold text-[#007aff] dark:text-[#0a84ff] mb-2">Why It Matters</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Our models don't just guess the wound size. As seen in the sliding timeline, the AI tracks pixel-by-pixel shifts in critical tissue types. This unlocks true predictive healthcare.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
