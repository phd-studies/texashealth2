"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createAssessment } from "@/actions/assessmentActions";
import { useRouter } from "next/navigation";
import { Camera, ShieldCheck, Loader2, ImagePlus, X, CheckCircle2 } from "lucide-react";

type UploadState = "idle" | "uploading" | "saving" | "done" | "error";

export default function CameraBooth() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLiveCamera, setIsLiveCamera] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsLiveCamera(false);
  };

  const startCamera = async () => {
    try {
      if (window.isSecureContext) {
        setIsLiveCamera(true);
        setErrorMsg("");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        cameraInputRef.current?.click();
      }
    } catch (err: any) {
      cameraInputRef.current?.click();
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
              setSelectedFile(file);
              setPreview(URL.createObjectURL(file));
              setUploadState("idle");
              stopCamera();
            }
          },
          "image/jpeg",
          0.9
        );
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.type)) {
      setErrorMsg("Only JPEG and PNG files are allowed.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setErrorMsg("File must be under 4MB.");
      return;
    }

    setErrorMsg("");
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setUploadState("idle");
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    setUploadState("idle");
    setErrorMsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = useCallback(async () => {
    if (!selectedFile) return;

    setUploadState("uploading");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload.error || "Upload failed");
      }

      const { url } = payload;

      setUploadState("saving");
      const result = await createAssessment(url);

      if (result && result.success !== false) {
        setUploadState("done");
        setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        throw new Error(result?.error || "Failed to save assessment");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setUploadState("error");
    }
  }, [selectedFile, router]);

  const statusLabel: Record<UploadState, string> = {
    idle: "",
    uploading: "Uploading to Azure...",
    saving: "Saving tracking record...",
    done: "Saved! Redirecting...",
    error: "",
  };

  const isProcessing = uploadState === "uploading" || uploadState === "saving" || uploadState === "done";

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-6 shadow-apple relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500" />

        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-[#007aff] dark:text-[#0a84ff]">
            <Camera className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight mb-1">Camera Booth</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-[260px]">
            Securely capture or upload a wound photo. It will be saved to your Azure storage and logged to your profile.
          </p>

          {isProcessing ? (
            <div className="w-full flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-[#252528] rounded-2xl border border-gray-100 dark:border-gray-800">
              {uploadState === "done" ? (
                <CheckCircle2 className="w-10 h-10 text-green-500 mb-3" />
              ) : (
                <Loader2 className="w-10 h-10 animate-spin text-[#007aff] dark:text-[#0a84ff] mb-3" />
              )}
              <p className="text-sm font-semibold text-black dark:text-white">{statusLabel[uploadState]}</p>
            </div>
          ) : (
            <>
              {isLiveCamera && !preview ? (
                <div className="w-full relative rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-black aspect-[3/4] flex flex-col mb-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-0 w-full flex justify-center gap-6">
                    <button
                      onClick={stopCamera}
                      className="bg-black/60 hover:bg-black/80 text-white rounded-full p-4 backdrop-blur-md transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <button
                      onClick={capturePhoto}
                      className="bg-white text-black rounded-full p-4 hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                      <Camera className="w-7 h-7" />
                    </button>
                  </div>
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              ) : !preview ? (
                <div className="w-full flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={startCamera}
                    className="w-full border-2 border-[#007aff]/30 dark:border-[#0a84ff]/30 bg-blue-50/20 dark:bg-blue-900/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-[#007aff] dark:hover:border-[#0a84ff] transition-all cursor-pointer group"
                  >
                    <Camera className="w-8 h-8 text-[#007aff]/70 dark:text-[#0a84ff]/70 group-hover:text-[#007aff] dark:group-hover:text-[#0a84ff] transition-colors" />
                    <span className="text-[#007aff] dark:text-[#0a84ff] font-semibold text-sm group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      Take Live Photo
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 bg-transparent rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer group"
                  >
                    <ImagePlus className="w-8 h-8 text-gray-400 group-hover:text-gray-500 transition-colors" />
                    <span className="text-gray-500 font-semibold text-sm transition-colors">
                      Upload from Device
                    </span>
                    <span className="text-gray-400 text-xs">JPEG or PNG, under 4MB</span>
                  </button>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-3">
                  <div className="w-full relative rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                    <img
                      src={preview}
                      alt="Wound preview"
                      className="w-full object-cover rounded-2xl"
                      style={{ maxHeight: "300px" }}
                    />
                    <button
                      onClick={handleClear}
                      className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                      aria-label="Remove photo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={handleUpload}
                    className="w-full bg-[#007aff] dark:bg-[#0a84ff] hover:opacity-90 active:scale-[0.98] transition-all text-white font-semibold rounded-2xl py-4 shadow-apple shadow-blue-500/20 text-[15px] tracking-wide"
                  >
                    Upload & Save Assessment
                  </button>
                </div>
              )}
              
              {errorMsg && (
                <p className="text-red-500 text-xs mt-3 font-medium px-2">{errorMsg}</p>
              )}
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="mt-5 flex items-center justify-center text-xs text-gray-400 dark:text-gray-500 font-medium">
            <ShieldCheck className="w-4 h-4 mr-1 text-green-500 opacity-80" />
            Files stored securely in Azure
          </div>
        </div>
      </div>
    </div>
  );
}
