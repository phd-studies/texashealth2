import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Assessment from "@/models/Assessment";
import { FileStack, Camera, User, ChevronRight } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  await dbConnect();
  
  const assessments = await Assessment.find({ userId }).sort({ date: -1 }).lean();

  return (
    <div className="min-h-screen flex justify-center bg-[#f2f2f7] dark:bg-black">
      <main className="w-full max-w-md bg-[#f2f2f7] dark:bg-black min-h-screen shadow-2xl shadow-black/5 flex flex-col relative">
        <div className="flex flex-col h-full animate-in fade-in duration-500 pt-16 px-5 pb-8 min-h-screen">
          
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-black dark:text-white tracking-tight leading-tight">
                Dashboard
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-1">
                Your Assessments
              </p>
            </div>
            <div>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 border border-gray-200 dark:border-gray-800"
                  }
                }}
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Link href="/profile" className="col-span-2 bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-5 shadow-apple flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#252528] transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <User className="text-blue-500 dark:text-[#0a84ff] w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-black dark:text-white text-lg">Profile Settings</h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Edit clinical demographics</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 mr-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-black dark:text-white tracking-tight mb-4 px-1 mt-4">
              Assessments History
            </h2>

            {assessments.length === 0 ? (
              <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-8 shadow-apple flex items-center justify-center flex-col text-center mt-4">
                <FileStack className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">No assessments yet, let's log one!</h3>
                <p className="text-gray-500 text-sm">Start your clinical tracking by taking your first secure photo assessment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {assessments.map((a: any) => (
                  <div key={a._id.toString()} className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-5 shadow-apple flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#252528] transition-colors cursor-pointer">
                    <div>
                      <p className="font-semibold text-black dark:text-white text-lg">{a.woundType || "General Screen"}</p>
                      <p className="text-sm text-gray-500 mt-1">{new Date(a.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    {a.sizeCm2 && (
                      <div className="bg-[#007aff]/10 dark:bg-[#0a84ff]/20 px-3 py-1.5 rounded-xl border border-[#007aff]/20 flex items-center justify-center">
                        <p className="text-[#007aff] dark:text-[#0a84ff] font-bold text-sm tracking-tight">{a.sizeCm2} cm²</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 mb-6">
            <Link
              href="/"
              className="w-full bg-[#007aff] dark:bg-[#0a84ff] hover:opacity-90 active:scale-[0.98] transition-all duration-200 text-white font-semibold rounded-2xl py-4 flex items-center justify-center shadow-apple shadow-blue-500/20"
            >
              <Camera className="w-5 h-5 mr-2" />
              <span className="text-lg tracking-wide">Start New Camera Assessment</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
