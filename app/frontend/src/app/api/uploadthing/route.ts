// UploadThing has been replaced by Azure Blob Storage.
// Upload endpoint is now at /api/upload
import { NextResponse } from "next/server";
export function GET() { return NextResponse.json({ error: "Not found" }, { status: 404 }); }
export function POST() { return NextResponse.json({ error: "Not found" }, { status: 404 }); }
