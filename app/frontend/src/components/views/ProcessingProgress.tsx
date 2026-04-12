import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function ProcessingProgress({ onComplete }: { onComplete: () => void }) {
  const steps = [
    "Uploading image...",
    "Scanning wound metrics...",
    "Analyzing severity...",
    "Generating prognosis..."
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f2f2f7] dark:bg-black px-6">
      
      <div className="bg-white dark:bg-[#1c1c1e] w-full rounded-3xl shadow-apple p-10 flex flex-col items-center animate-in zoom-in-95 duration-500">
        
        <div className="relative mb-8">
          <Loader2 className="w-12 h-12 text-[#007aff] dark:text-[#0a84ff] animate-spin" />
        </div>
        
        <div className="space-y-6 w-full">
          {/* Dynamic Text */}
          <div className="h-6 relative overflow-hidden flex justify-center">
            {steps.map((text, idx) => (
              <p 
                key={idx}
                className={`absolute text-base font-medium transition-all duration-500 text-center w-full
                  ${idx === currentStep ? "translate-y-0 opacity-100 text-black dark:text-white" : 
                    idx < currentStep ? "-translate-y-8 opacity-0" : "translate-y-8 opacity-0"}`
                }
              >
                {text}
              </p>
            ))}
          </div>

          {/* Native-style iOS Progress Bar */}
          <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shrink-0">
            <div 
              className="h-full bg-[#007aff] dark:bg-[#0a84ff] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

      </div>

    </div>
  );
}
