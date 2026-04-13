"use server";

import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import PatientProfile from "@/models/PatientProfile";
import { revalidatePath } from "next/cache";

export async function updatePatientProfile(formData: FormData) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const name = formData.get("name") as string;
  const age = formData.get("age") ? Number(formData.get("age")) : undefined;
  const weight = formData.get("weight") ? Number(formData.get("weight")) : undefined;
  const height = formData.get("height") as string;

  await PatientProfile.findOneAndUpdate(
    { userId },
    {
      $set: {
        name,
        age,
        weight,
        height,
      }
    },
    { upsert: true, new: true }
  );

  revalidatePath('/profile');
}
