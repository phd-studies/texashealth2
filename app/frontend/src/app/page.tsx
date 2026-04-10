"use client";

import { useState } from "react";
import MacWindowFrame from "@/components/MacWindowFrame";
import AppDashboard from "@/components/views/AppDashboard";
import PreparationAssistant from "@/components/views/PreparationAssistant";
import CameraBooth from "@/components/views/CameraBooth";
import ProcessingProgress from "@/components/views/ProcessingProgress";
import HealthReportViewer from "@/components/views/HealthReportViewer";

type ViewState = "landing" | "instructions" | "capture" | "processing" | "results";

export default function Home() {
  const [view, setView] = useState<ViewState>("landing");

  const renderView = () => {
    switch (view) {
      case "landing":
        return <AppDashboard onStart={() => setView("instructions")} />;
      case "instructions":
        return (
          <PreparationAssistant 
            onNext={() => setView("capture")} 
            onBack={() => setView("landing")} 
          />
        );
      case "capture":
        return (
          <CameraBooth 
            onSimulateUpload={() => setView("processing")} 
            onBack={() => setView("instructions")} 
          />
        );
      case "processing":
        return <ProcessingProgress onComplete={() => setView("results")} />;
      case "results":
        return <HealthReportViewer onRestart={() => setView("landing")} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] flex items-center justify-center p-4 sm:p-6 md:p-12 background-pattern">
      {/* Decorative background blur element */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      
      <div className="w-full relative z-10">
        <MacWindowFrame title="HealthScreen Pro - Clinical Module v1.0">
          {renderView()}
        </MacWindowFrame>
      </div>
    </div>
  );
}
