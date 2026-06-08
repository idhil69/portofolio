import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { promises as fs } from "fs";
import path from "path";
import { redis } from "@/lib/redis";

const KV_KEY = "portfolio_data";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const dataPath = path.join(process.cwd(), "data.json");
  let data: any = null;

  try {
    data = await redis.get(KV_KEY);
  } catch (e) {
    console.error("Redis fetch failed in login:", e);
  }

  if (!data) {
    try {
      const raw = await fs.readFile(dataPath, "utf8");
      data = JSON.parse(raw);
    } catch (e) {
      return NextResponse.json({ error: "Gagal membaca data." }, { status: 500 });
    }
  }

  const { credentials } = data;

  const validUsername = credentials?.username || process.env.ADMIN_USERNAME;
  const validPassword = credentials?.password || process.env.ADMIN_PASSWORD;

  if (username === validUsername && password === validPassword) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Username atau password salah." }, { status: 401 });
}
