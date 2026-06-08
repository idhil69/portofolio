import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const KV_KEY = "portfolio_data";

// Default fallback data - used only if Redis is empty AND we can't read the file
// In production (Vercel), always use Redis as the primary data store
async function getLocalFallbackData() {
  try {
    // Dynamic import for fs - only works in Node.js runtime (not Edge)
    const fs = await import("fs/promises");
    const path = await import("path");
    const dataFilePath = path.join(process.cwd(), "data.json");
    const fileContents = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(fileContents);
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    // 1. Try to get data from Upstash Redis (primary data store)
    let data = await redis.get(KV_KEY);

    if (data) {
      return NextResponse.json(data);
    }

    // 2. Fallback to local data.json if Redis is empty (first run / seeding)
    const localData = await getLocalFallbackData();
    if (localData) {
      // Seed Redis with initial data so subsequent requests use Redis
      try {
        await redis.set(KV_KEY, localData);
      } catch (seedErr) {
        console.warn("Failed to seed Redis with initial data:", seedErr);
      }
      return NextResponse.json(localData);
    }

    return NextResponse.json(
      { error: "No data found. Redis is empty and no local fallback available." },
      { status: 500 }
    );
  } catch (error) {
    console.error("Failed to load data from Redis:", error);

    // Fallback to local file if Redis fails
    const localData = await getLocalFallbackData();
    if (localData) {
      return NextResponse.json(localData);
    }

    return NextResponse.json(
      { error: "Failed to load data. Redis connection failed and no local fallback." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();

    if (!newData) {
      return NextResponse.json(
        { error: "No data provided." },
        { status: 400 }
      );
    }

    // Primary: Save to Upstash Redis (this is the production data store)
    try {
      await redis.set(KV_KEY, newData);
    } catch (redisError: any) {
      console.error("Redis write failed:", redisError);
      return NextResponse.json(
        {
          error: `Gagal menyimpan data ke database: ${redisError.message || "Unknown error"}. Pastikan UPSTASH_REDIS_REST_URL dan UPSTASH_REDIS_REST_TOKEN sudah diset dengan benar di Vercel Dashboard → Settings → Environment Variables.`,
        },
        { status: 500 }
      );
    }

    // Secondary: Also try to write to local file for dev mode (silently fail in production)
    try {
      const fs = await import("fs/promises");
      const path = await import("path");
      const dataFilePath = path.join(process.cwd(), "data.json");
      await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), "utf8");
    } catch {
      // Expected to fail in production Vercel (read-only filesystem) - this is fine
    }

    return NextResponse.json({
      message: "Data updated successfully",
      data: newData,
    });
  } catch (error: any) {
    console.error("Failed to save data:", error);
    return NextResponse.json(
      {
        error: `Gagal menyimpan data: ${error.message || "Unknown error"}`,
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
