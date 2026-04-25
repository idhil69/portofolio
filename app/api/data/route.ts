import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data.json");
const KV_KEY = "portfolio_data";

export async function GET() {
  try {
    // 1. Try to get data from Vercel KV first
    let data = await kv.get(KV_KEY);
    
    if (!data) {
      // 2. Fallback to local data.json if KV is empty (first run)
      const fileContents = await fs.readFile(dataFilePath, "utf8");
      data = JSON.parse(fileContents);
      
      // Seed KV with initial data for future use
      await kv.set(KV_KEY, data);
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to load data:", error);
    // Absolute fallback to local file if KV fails
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
    
    // Save to Vercel KV for persistence in production
    await kv.set(KV_KEY, newData);
    
    // Also try to write to local file (only works in dev mode)
    try {
      await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), "utf8");
    } catch (e) {
      // Ignore write errors in production (read-only FS)
    }

    return NextResponse.json({ message: "Data updated successfully", data: newData });
  } catch (error) {
    console.error("Failed to save data:", error);
    return NextResponse.json({ error: "Failed to save data. Pastikan KV_REST_API_URL sudah dikonfigurasi." }, { status: 500 });
  }
}

