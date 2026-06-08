import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { promises as fs } from "fs";
import path from "path";
import { redis } from "@/lib/redis";

const KV_KEY = "portfolio_data";

export async function POST(request: Request) {
  // Verify session first
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword, confirmPassword } = await request.json();

  if (!currentPassword || !newPassword || !confirmPassword) {
    return NextResponse.json({ error: "Semua field wajib diisi." }, { status: 400 });
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json({ error: "Password baru tidak cocok." }, { status: 400 });
  }

  if (newPassword.length < 6) {
    return NextResponse.json({ error: "Password baru minimal 6 karakter." }, { status: 400 });
  }

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
      return NextResponse.json({ error: "Gagal membaca data." }, { status: 500 });
    }
  }

  const currentUsername = data.credentials?.username || process.env.ADMIN_USERNAME;
  const currentStoredPassword = data.credentials?.password || process.env.ADMIN_PASSWORD;

  if (currentPassword !== currentStoredPassword) {
    return NextResponse.json({ error: "Password saat ini salah." }, { status: 400 });
  }

  // Update password in data
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

  return NextResponse.json({ success: true, message: "Password berhasil diubah!" });
}
