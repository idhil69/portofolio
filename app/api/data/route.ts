import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data.json");

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, "utf8");
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to read data.json:", error);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), "utf8");
    return NextResponse.json({ message: "Data updated successfully", data: newData });
  } catch (error) {
    console.error("Failed to write to data.json:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
