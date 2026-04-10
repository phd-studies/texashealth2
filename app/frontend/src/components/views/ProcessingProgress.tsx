import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function ProcessingProgress({ onComplete }: { onComplete: () => void }) {
  const steps = [
    "Uploading secure stream...",
    "Extracting keyframes...",
    "Initializing biometrics model...",
    "Analyzing subtle biomechanics...",
    "Generating AI report..."
  ];
  
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Progress through steps every 1.5 seconds
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 800); // Small delay before transition
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [onComplete, steps.length]);

  return (
    <div className="flex flex-col items-center justify-center h-full flex-1">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 rounded-full animate-pulse"></div>
        <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center relative z-10">
          <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-spin" />
        </div>
      </div>
      
      <div className="space-y-4 w-full max-w-sm">
        {/* Progress bar line */}
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        {/* Dynamic Text */}
        <div className="h-8 relative overflow-hidden flex justify-center">
          {steps.map((text, idx) => (
            <p 
              key={idx}
              className={`absolute text-sm font-medium transition-all duration-500 text-center w-full
                ${idx === currentStep ? "translate-y-0 opacity-100 text-slate-700 dark:text-slate-300" : 
                  idx < currentStep ? "-translate-y-8 opacity-0" : "translate-y-8 opacity-0"}`
              }
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
