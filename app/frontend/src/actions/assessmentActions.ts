"use server";

import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Assessment from "@/models/Assessment";
import { revalidatePath } from "next/cache";

export async function createAssessment(imageUrl: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: Must be logged in to create an assessment");
  }

  await dbConnect();

  try {
    const newAssessment = await Assessment.create({
      userId,
      imageUrl,
      woundType: "General Screen", // default for now per requirements
      date: new Date(),
    });

    console.log("Assessment successfully added to MongoDB!");
    
    // Revalidate dashboard path to ensure new data appears
    revalidatePath("/dashboard");
    
    // Return true for success which our UI element can evaluate
    return { success: true, assessmentId: newAssessment._id.toString() };
  } catch (error) {
    console.error("Failed to insert assessment:", error);
    return { success: false, error: "Failed to create assessment." };
  }
}

export async function deleteAssessment(assessmentId: string, formData?: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: Must be logged in to delete an assessment");
  }

  await dbConnect();

  try {
    await Assessment.findOneAndDelete({ _id: assessmentId, userId });
    console.log(`Assessment ${assessmentId} successfully deleted!`);
    
    // Revalidate dashboard path to ensure new data appears
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Failed to delete assessment:", error);
  }
}
