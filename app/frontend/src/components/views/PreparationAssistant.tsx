import { useState } from "react";
import { CheckCircle2, ChevronRight, Circle, ArrowLeft } from "lucide-react";

export default function PreparationAssistant({ 
  onNext, 
  onBack 
}: { 
  onNext: () => void;
  onBack: () => void;
}) {
  const [checked, setChecked] = useState([false, false, false]);

  const items = [
    { title: "Ensure good lighting", desc: "Face a light source so your features are visible clearly." },
    { title: "Position camera at eye level", desc: "Your entire face and upper torso should be in the frame." },
    { title: "Remove facial obstructions", desc: "Please remove glasses temporarily if possible for best accuracy." }
  ];

  const handleCheck = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const allChecked = checked.every(Boolean);

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-500">
      <div className="mb-8 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex-1 text-center pr-8">
          Preparation Setup
        </h2>
      </div>

      <div className="flex-1 max-w-md mx-auto w-full space-y-6">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 text-center">
          Please confirm the following checklist to ensure optimal analysis conditions.
        </p>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => handleCheck(idx)}
              className={`p-4 rounded-xl border flex items-start gap-4 cursor-pointer transition-all ${
                checked[idx] 
                  ? "bg-blue-50/50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 shadow-sm" 
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300"
              }`}
            >
              <div className="mt-0.5 shrink-0 transition-colors duration-200">
                {checked[idx] ? (
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                )}
              </div>
              <div>
                <h4 className={`text-sm font-medium ${checked[idx] ? "text-blue-900 dark:text-blue-100" : "text-slate-700 dark:text-slate-300"}`}>
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center pb-4">
        <button
          onClick={onNext}
          disabled={!allChecked}
          className={`flex items-center px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
            allChecked 
              ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" 
              : "bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600"
          }`}
        >
          Initialize Camera
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
