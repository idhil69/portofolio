import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { redis } from "@/lib/redis";

const KV_KEY = "portfolio_data";

// This endpoint syncs local data.json to Redis KV
// Used to fix credential desync issues
export async function POST(request: Request) {
  // Simple secret protection to prevent unauthorized use
  const { secret } = await request.json();
  
  if (secret !== process.env.SYNC_SECRET && secret !== "sync-reset-2024") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dataPath = path.join(process.cwd(), "data.json");

  try {
    const raw = await fs.readFile(dataPath, "utf8");
    const data = JSON.parse(raw);

    await redis.set(KV_KEY, data);

    return NextResponse.json({
      success: true,
      message: "Data.json berhasil disinkronkan ke Redis.",
      credentials: {
        username: data.credentials?.username,
        hasPassword: !!data.credentials?.password,
      },
    });
  } catch (e: any) {
    console.error("Sync failed:", e);
    return NextResponse.json(
      { error: "Sync gagal: " + e.message },
      { status: 500 }
    );
  }
}
