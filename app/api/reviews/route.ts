import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data.json");
const KV_KEY = "portfolio_data";

// Initialize Upstash Redis
const redis = Redis.fromEnv();

export async function POST(request: Request) {
  try {
    const { name, rating, message } = await request.json();

    if (!name || !message || !rating) {
      return NextResponse.json({ error: "Nama, rating, dan pesan harus diisi." }, { status: 400 });
    }

    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ error: "Rating harus bernilai antara 1 dan 5." }, { status: 400 });
    }

    // 1. Get current data from Redis
    let data: any = null;
    try {
      data = await redis.get(KV_KEY);
    } catch (e) {
      console.error("Redis fetch failed in reviews route:", e);
    }

    // Fallback to local data if Redis is empty or fails
    if (!data) {
      try {
        const fileContents = await fs.readFile(dataFilePath, "utf8");
        data = JSON.parse(fileContents);
      } catch {
        data = { reviews: [] };
      }
    }

    // 2. Add the new review
    const newReview = {
      name: name.substring(0, 100),
      type: "Client Feedback",
      rating: ratingNum,
      message: message.substring(0, 1000),
      date: new Date().toISOString()
    };

    if (!data.reviews) {
      data.reviews = [];
    }

    data.reviews = [newReview, ...data.reviews];

    // 3. Save back to Redis
    await redis.set(KV_KEY, data);

    // Attempt local write for dev mode
    try {
      await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    } catch (e) {}

    return NextResponse.json({ message: "Review berhasil ditambahkan", review: newReview });
  } catch (error: any) {
    console.error("Failed to add review:", error);
    return NextResponse.json({ 
      error: `Failed to add review: ${error.message || "Unknown error"}`,
      details: error.toString()
    }, { status: 500 });
  }
}
