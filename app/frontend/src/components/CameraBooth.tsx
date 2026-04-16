"use client";

import { useState, useRef, useCallback } from "react";
import { createAssessment } from "@/actions/assessmentActions";
import { useRouter } from "next/navigation";
import { Camera, ShieldCheck, Loader2, ImagePlus, X, CheckCircle2 } from "lucide-react";
import Image from "next/image";

type UploadState = "idle" | "uploading" | "saving" | "done" | "error";

export default function CameraBooth() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
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
      // Step 1: Upload to Azure Blob via our API route
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Upload failed");
      }

      const { url } = await res.json();

      // Step 2: Save URL to MongoDB via Server Action
      setUploadState("saving");
      const result = await createAssessment(url);

      if (result.success) {
        setUploadState("done");
        setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        throw new Error(result.error || "Failed to save assessment");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setUploadState("error");
    }
  }, [selectedFile, router]);

  const statusLabel: Record<UploadState, string> = {
    idle: "",
    uploading: "Uploading to Azure...",
    saving: "Saving to record...",
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
            Securely upload a wound photo. It will be saved to your Azure storage and logged to your profile.
          </p>

          {/* Processing State */}
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
              {/* Drop / Select Zone */}
              {!preview ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-[#007aff]/30 dark:border-[#0a84ff]/30 bg-transparent rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-[#007aff] hover:bg-blue-50/50 dark:hover:bg-[#0a84ff]/10 transition-all cursor-pointer group"
                >
                  <ImagePlus className="w-10 h-10 text-[#007aff]/50 dark:text-[#0a84ff]/50 group-hover:text-[#007aff] dark:group-hover:text-[#0a84ff] transition-colors" />
                  <span className="text-[#007aff] dark:text-[#0a84ff] font-semibold text-sm group-hover:text-blue-700 transition-colors">
                    Tap to Select Photo
                  </span>
                  <span className="text-gray-400 text-xs">JPEG or PNG, under 4MB</span>
                </button>
              ) : (
                /* Preview */
                <div className="w-full relative rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                  <Image
                    src={preview}
                    alt="Wound preview"
                    width={400}
                    height={300}
                    className="w-full object-cover rounded-2xl"
                    style={{ maxHeight: "260px" }}
                  />
                  <button
                    onClick={handleClear}
                    className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors"
                    aria-label="Remove photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Error */}
              {errorMsg && (
                <p className="text-red-500 text-xs mt-3 font-medium">{errorMsg}</p>
              )}

              {/* Upload Button */}
              {selectedFile && (
                <button
                  onClick={handleUpload}
                  className="mt-4 w-full bg-[#007aff] dark:bg-[#0a84ff] hover:opacity-90 active:scale-[0.98] transition-all text-white font-semibold rounded-2xl py-4 shadow-apple shadow-blue-500/20 text-[15px] tracking-wide"
                >
                  Upload & Save Assessment
                </button>
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

          <div className="mt-5 flex items-center justify-center text-xs text-gray-400 dark:text-gray-500 font-medium">
            <ShieldCheck className="w-4 h-4 mr-1 text-green-500 opacity-80" />
            Files stored in Azure South Central US
          </div>
        </div>
      </div>
    </div>
  );
}
