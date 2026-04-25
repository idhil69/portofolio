import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Read credentials from data.json (dynamic — changes take effect immediately)
  const dataPath = path.join(process.cwd(), "data.json");
  const raw = await fs.readFile(dataPath, "utf8");
  const data = JSON.parse(raw);
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
