import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { BlobServiceClient } from "@azure/storage-blob";

const CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING!;
const CONTAINER_NAME = "user-photos";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only JPEG and PNG files are allowed" }, { status: 400 });
    }

    // Validate file size (4MB max)
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be under 4MB" }, { status: 400 });
    }

    // Build blob name: userId-timestamp-originalFilename
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const blobName = `${userId}-${Date.now()}-${sanitizedName}`;

    // Upload to Azure Blob Storage
    const blobServiceClient = BlobServiceClient.fromConnectionString(CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let warningMsg: string | undefined = undefined;
    if (process.env.ROBOFLOW_ENABLED === "true") {
      try {
        const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY;
        const ROBOFLOW_MODEL = process.env.ROBOFLOW_MODEL || "foot_identifier";
        const ROBOFLOW_VERSION = process.env.ROBOFLOW_VERSION || "1";
        
        if (ROBOFLOW_API_KEY) {
          const modelUrl = `https://detect.roboflow.com/${ROBOFLOW_MODEL}/${ROBOFLOW_VERSION}?api_key=${ROBOFLOW_API_KEY}`;
          const base64Image = buffer.toString("base64");
          
          const detectRes = await fetch(modelUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: base64Image
          });
          
          if (detectRes.ok) {
            const detectData = await detectRes.json();
            if (detectData && detectData.predictions) {
              const feetDetected = detectData.predictions.some((p: any) => {
                const cls = p.class?.toLowerCase() || "";
                return (cls.includes("foot") || cls.includes("feet") || cls.includes("ulcer") || cls.includes("wound") || cls.includes("toe")) && p.confidence > 0.40;
              });
              
              if (!feetDetected && detectData.predictions.length === 0) {
                 warningMsg = "AI Warning: No objects could be identified. Ensure the foot is clearly visible and well-lit.";
              } else if (!feetDetected) {
                 warningMsg = "AI Warning: We couldn't confidently identify a foot in this image.";
              }
            }
          } else {
             console.error("[Roboflow] API Error:", await detectRes.text());
          }
        }
      } catch (aiErr) {
        console.error("[Roboflow] Integration Error:", aiErr);
      }
    }

    await blockBlobClient.upload(buffer, buffer.length, {
      blobHTTPHeaders: { blobContentType: file.type },
    });

    console.log(`[Upload] userId=${userId} blob=${blobName} url=${blockBlobClient.url}`);

    return NextResponse.json({ url: blockBlobClient.url, warning: warningMsg });
  } catch (error) {
    console.error("[Upload] Failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
