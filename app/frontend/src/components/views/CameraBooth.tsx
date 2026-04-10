import { UploadCloud, Camera, Video, ArrowLeft } from "lucide-react";

export default function CameraBooth({ 
  onSimulateUpload,
  onBack 
}: { 
  onSimulateUpload: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col h-full animate-in zoom-in-95 duration-500">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 text-center flex-1 pr-8">
          Video Input
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-[300px]">
        {/* Module 1: File Upload */}
        <div 
          onClick={onSimulateUpload}
          className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl flex flex-col items-center justify-center p-8 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-medium text-slate-700 dark:text-slate-200">Upload Recording</h3>
          <p className="text-xs text-slate-500 text-center mt-2 px-4">
            Drag and drop your MP4/MOV file here, or click to browse.
          </p>
        </div>

        {/* Module 2: Webcam Record */}
        <div 
          onClick={onSimulateUpload}
          className="border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-10">
              <Camera className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="absolute top-0 left-0 w-16 h-16 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
          </div>
          <h3 className="font-medium text-slate-700 dark:text-slate-200">Start Camera</h3>
          <p className="text-xs text-slate-500 text-center mt-2 px-4">
            Record directly using your device's webcam. <Video className="w-3 h-3 inline pb-[1px]" />
          </p>
        </div>
      </div>
    </div>
  );
}
