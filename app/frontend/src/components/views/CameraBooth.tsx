import { UploadCloud, Camera as CameraIcon, Video, ArrowLeft } from "lucide-react";

export default function CameraBooth({ 
  onSimulateUpload,
  onBack 
}: { 
  onSimulateUpload: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300 min-h-screen bg-[#f2f2f7] dark:bg-black pt-14">
      
      {/* Navigation Header */}
      <div className="flex items-center px-4 mb-6 sticky top-0 bg-[#f2f2f7]/80 dark:bg-black/80 backdrop-blur-md pb-4 pt-2 z-10">
        <button 
          onClick={onBack} 
          className="flex items-center text-[#007aff] dark:text-[#0a84ff] hover:opacity-80 transition-opacity active:opacity-50"
        >
          <ArrowLeft className="w-6 h-6 mr-1" />
          <span className="text-lg font-medium">Summary</span>
        </button>
      </div>

      <div className="px-5 pb-8 flex-1 flex flex-col">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-8 tracking-tight px-1">
          Add Log
        </h2>

        <div className="space-y-4 flex-1">
          {/* Use Camera Component */}
          <div 
            onClick={onSimulateUpload}
            className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 shadow-apple flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:scale-[0.98]"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
              <CameraIcon className="w-7 h-7 text-[#007aff] dark:text-[#0a84ff]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-black dark:text-white">Camera</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Capture a new image now</p>
            </div>
          </div>

          {/* Upload Library Component */}
          <div 
            onClick={onSimulateUpload}
            className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 shadow-apple flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:scale-[0.98]"
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-900/40 flex items-center justify-center shrink-0">
              <UploadCloud className="w-7 h-7 text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-black dark:text-white">Photo Library</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Select from camera roll</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
