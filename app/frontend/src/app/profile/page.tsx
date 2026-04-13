import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import PatientProfile from "@/models/PatientProfile";
import { updatePatientProfile } from "@/actions/profileActions";
import { ArrowLeft, User, Scale, Ruler, CalendarHeart, Save } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  await dbConnect();
  
  const profile = await PatientProfile.findOne({ userId }).lean();

  return (
    <div className="min-h-screen flex justify-center bg-[#f2f2f7] dark:bg-black">
      <main className="w-full max-w-md bg-[#f2f2f7] dark:bg-black min-h-screen shadow-2xl shadow-black/5 flex flex-col relative overflow-hidden">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between px-5 py-4 mt-8 sticky top-0 z-10 bg-[#f2f2f7]/90 dark:bg-black/90 backdrop-blur-md">
          <Link 
            href="/dashboard"
            className="flex items-center text-[#007aff] dark:text-[#0a84ff] hover:opacity-80 transition-opacity active:opacity-50 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Dashboard
          </Link>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 border border-gray-200 dark:border-gray-800"
              }
            }}
          />
        </div>

        <div className="px-5 pb-8 flex-1 animate-in slide-in-from-right-4 duration-300 pt-4">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2 tracking-tight leading-tight">
            Demographics
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-6">
            Clinical baseline data
          </p>

          <form action={updatePatientProfile} className="space-y-4">
            
            {/* Name Card */}
            <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-5 shadow-apple flex flex-col">
              <label htmlFor="name" className="text-gray-500 dark:text-gray-400 font-semibold text-[11px] uppercase tracking-wider mb-2 flex items-center">
                <User className="w-3.5 h-3.5 mr-1.5" /> Full Name
              </label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                defaultValue={profile?.name || ''} 
                className="bg-transparent text-xl font-bold text-black dark:text-white outline-none w-full placeholder:text-gray-300 dark:placeholder:text-gray-700"
                placeholder="Jane Doe"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Age Card */}
              <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-5 shadow-apple flex flex-col justify-between">
                <label htmlFor="age" className="text-gray-500 dark:text-gray-400 font-semibold text-[11px] uppercase tracking-wider mb-2 flex items-center">
                  <CalendarHeart className="w-3.5 h-3.5 mr-1.5" /> Age (Years)
                </label>
                <input 
                  id="age" 
                  name="age" 
                  type="number" 
                  defaultValue={profile?.age || ''} 
                  className="bg-transparent text-3xl font-bold text-black dark:text-white tracking-tighter outline-none w-full placeholder:text-gray-300 dark:placeholder:text-gray-700"
                  placeholder="--"
                />
              </div>

              {/* Weight Card */}
              <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-5 shadow-apple flex flex-col justify-between">
                <label htmlFor="weight" className="text-gray-500 dark:text-gray-400 font-semibold text-[11px] uppercase tracking-wider mb-2 flex items-center">
                  <Scale className="w-3.5 h-3.5 mr-1.5" /> Weight (lbs)
                </label>
                <input 
                  id="weight" 
                  name="weight" 
                  type="number" 
                  defaultValue={profile?.weight || ''} 
                  className="bg-transparent text-3xl font-bold text-black dark:text-white tracking-tighter outline-none w-full placeholder:text-gray-300 dark:placeholder:text-gray-700"
                  placeholder="--"
                />
              </div>
              
              {/* Height Card */}
              <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-5 shadow-apple flex flex-col justify-between col-span-2">
                <label htmlFor="height" className="text-gray-500 dark:text-gray-400 font-semibold text-[11px] uppercase tracking-wider mb-2 flex items-center">
                  <Ruler className="w-3.5 h-3.5 mr-1.5" /> Height
                </label>
                <input 
                  id="height" 
                  name="height" 
                  type="text" 
                  defaultValue={profile?.height || ''} 
                  className="bg-transparent text-2xl font-bold text-black dark:text-white outline-none w-full placeholder:text-gray-300 dark:placeholder:text-gray-700"
                  placeholder="e.g. 5'8 or 173cm"
                />
              </div>
            </div>

            <div className="pt-6 pb-8">
              <button
                type="submit"
                className="w-full bg-[#007aff] dark:bg-[#0a84ff] hover:opacity-90 active:scale-[0.98] transition-all duration-200 text-white font-semibold rounded-2xl py-4 flex items-center justify-center shadow-apple shadow-blue-500/20"
              >
                <Save className="w-5 h-5 mr-2" />
                <span className="text-lg tracking-wide">Save Profile</span>
              </button>
            </div>
            
          </form>
        </div>
      </main>
    </div>
  );
}
