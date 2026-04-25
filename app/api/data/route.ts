import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data.json");
const KV_KEY = "portfolio_data";

// Initialize Upstash Redis
const redis = Redis.fromEnv();

export async function GET() {
  try {
    // 1. Try to get data from Upstash Redis
    let data = await redis.get(KV_KEY);
    
    if (!data) {
      // 2. Fallback to local data.json if Redis is empty (first run)
      const fileContents = await fs.readFile(dataFilePath, "utf8");
      data = JSON.parse(fileContents);
      
      // Seed Redis with initial data
      await redis.set(KV_KEY, data);
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to load data:", error);
    try {
      const fileContents = await fs.readFile(dataFilePath, "utf8");
      return NextResponse.json(JSON.parse(fileContents));
    } catch {
      return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
    }
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    
    // Save to Upstash Redis
    await redis.set(KV_KEY, newData);
    
    // Attempt local write for dev mode
    try {
      await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), "utf8");
    } catch (e) {}

    return NextResponse.json({ message: "Data updated successfully", data: newData });
  } catch (error) {
    console.error("Failed to save data:", error);
    return NextResponse.json({ error: "Failed to save data." }, { status: 500 });
  }
}


