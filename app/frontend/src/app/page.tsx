"use client";

import { useState } from "react";
import AppDashboard from "@/components/views/AppDashboard";
import CameraBooth from "@/components/views/CameraBooth";
import ProcessingProgress from "@/components/views/ProcessingProgress";
import HealthReportViewer from "@/components/views/HealthReportViewer";

type ViewState = "landing" | "capture" | "processing" | "results";

export default function Home() {
  const [view, setView] = useState<ViewState>("landing");

  const renderView = () => {
    switch (view) {
      case "landing":
        return <AppDashboard onStart={() => setView("capture")} />;
      case "capture":
        return (
          <CameraBooth 
            onSimulateUpload={() => setView("processing")} 
            onBack={() => setView("landing")} 
          />
        );
      case "processing":
        return <ProcessingProgress onComplete={() => setView("results")} />;
      case "results":
        return <HealthReportViewer onRestart={() => setView("landing")} />;
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-[#f2f2f7] dark:bg-black">
      {/* Mobile constraint layout */}
      <main className="w-full max-w-md bg-[#f2f2f7] dark:bg-black min-h-screen pb-12 shadow-2xl shadow-black/5 flex flex-col relative overflow-hidden transition-all duration-300">
        {renderView()}
      </main>
    </div>
  );
}
