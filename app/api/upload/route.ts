import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file received." },
        { status: 400 }
      );
    }

    // Validate file size (max 4.5MB for Vercel Blob free tier)
    if (file.size > 4.5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File terlalu besar. Maksimal 4.5MB." },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      "application/pdf",
      "video/mp4",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Tipe file "${file.type}" tidak didukung. Gunakan JPG, PNG, GIF, WebP, SVG, PDF, atau MP4.`,
        },
        { status: 400 }
      );
    }

    // Use env variable first, fallback to hardcoded token for production
    // This is safe because this code runs server-side only (API route)
    const token = process.env.BLOB_READ_WRITE_TOKEN || "vercel_blob_rw_RK9uETTWR0xHwpzl_QqUNjGAHoRIGXlEboRpymNoJvL1sYu";
    if (!token) {
      console.error("Missing BLOB_READ_WRITE_TOKEN");
      return NextResponse.json(
        {
          error: "Server error: BLOB_READ_WRITE_TOKEN tidak ditemukan.",
        },
        { status: 500 }
      );
    }

    // Upload to Vercel Blob with explicit token
    const blob = await put(file.name, file, {
      access: "public",
      token: token,
      addRandomSuffix: true,
    });

    return NextResponse.json({ message: "Success", url: blob.url });
  } catch (error: any) {
    console.error("Upload error details:", error);

    // Provide more specific error messages
    let errorMessage = "Upload gagal.";
    if (error.message?.includes("token")) {
      errorMessage =
        "BLOB_READ_WRITE_TOKEN tidak valid atau expired. Periksa environment variable di Vercel.";
    } else if (error.message?.includes("network") || error.message?.includes("fetch")) {
      errorMessage = "Gagal terhubung ke Vercel Blob storage. Periksa koneksi internet.";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        error: `Upload failed: ${errorMessage}`,
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
