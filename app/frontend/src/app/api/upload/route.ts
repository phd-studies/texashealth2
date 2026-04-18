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

    await blockBlobClient.upload(buffer, buffer.length, {
      blobHTTPHeaders: { blobContentType: file.type },
    });

    console.log(`[Upload] userId=${userId} blob=${blobName} url=${blockBlobClient.url}`);

    return NextResponse.json({ url: blockBlobClient.url });
  } catch (error) {
    console.error("[Upload] Failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
