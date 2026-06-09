import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { redis } from "@/lib/redis";

const KV_KEY = "portfolio_data";
const RESET_TOKEN_KEY = "password_reset_token";

export async function POST(request: Request) {
  const { otp, newPassword, confirmPassword } = await request.json();

  if (!otp || !newPassword || !confirmPassword) {
    return NextResponse.json(
      { error: "Semua field wajib diisi." },
      { status: 400 }
    );
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json(
      { error: "Password baru tidak cocok." },
      { status: 400 }
    );
  }

  if (newPassword.length < 6) {
    return NextResponse.json(
      { error: "Password baru minimal 6 karakter." },
      { status: 400 }
    );
  }

  // Verify OTP from Redis
  let storedOtp: string | null = null;
  try {
    storedOtp = await redis.get(RESET_TOKEN_KEY);
  } catch (e) {
    console.error("Failed to retrieve OTP from Redis:", e);
    return NextResponse.json(
      { error: "Gagal memverifikasi kode OTP. Coba lagi." },
      { status: 500 }
    );
  }

  if (!storedOtp) {
    return NextResponse.json(
      { error: "Kode OTP sudah expired atau tidak valid. Silakan minta kode baru." },
      { status: 400 }
    );
  }

  if (otp.toString().trim() !== storedOtp.toString().trim()) {
    return NextResponse.json(
      { error: "Kode OTP salah." },
      { status: 400 }
    );
  }

  // OTP is valid — update password
  const dataPath = path.join(process.cwd(), "data.json");
  let data: any = null;

  try {
    data = await redis.get(KV_KEY);
  } catch (e) {
    console.error("Redis fetch failed:", e);
  }

  if (!data) {
    try {
      const raw = await fs.readFile(dataPath, "utf8");
      data = JSON.parse(raw);
    } catch (e) {
      return NextResponse.json(
        { error: "Gagal membaca data." },
        { status: 500 }
      );
    }
  }

  // Update credentials
  const currentUsername = data.credentials?.username || process.env.ADMIN_USERNAME || "admin";
  data.credentials = {
    username: currentUsername,
    password: newPassword,
  };

  // Save to Redis
  try {
    await redis.set(KV_KEY, data);
  } catch (e) {
    console.error("Failed to save to Redis:", e);
  }

  // Attempt local write
  try {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.error("Failed to save locally:", e);
  }

  // Delete OTP from Redis (one-time use)
  try {
    await redis.del(RESET_TOKEN_KEY);
  } catch (e) {
    console.error("Failed to delete OTP:", e);
  }

  return NextResponse.json({
    success: true,
    message: "Password berhasil direset! Silakan login dengan password baru.",
  });
}
