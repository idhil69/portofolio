import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      console.error("Missing BLOB_READ_WRITE_TOKEN in environment variables");
      return NextResponse.json({ error: "Server error: Token penyimpanan tidak ditemukan." }, { status: 500 });
    }

    // Upload to Vercel Blob with explicit token
    const blob = await put(file.name, file, {
      access: 'public',
      token: token,
      addRandomSuffix: true,
    });

    return NextResponse.json({ message: "Success", url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed. Pastikan BLOB_READ_WRITE_TOKEN sudah dikonfigurasi di Vercel." }, { status: 500 });
  }
}

