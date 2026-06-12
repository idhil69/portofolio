import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    let fetchUrl = "";
    if (url.includes("tiktok.com")) {
      fetchUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
    } else {
      return NextResponse.json({ error: "Unsupported provider" }, { status: 400 });
    }

    const res = await fetch(fetchUrl);
    if (!res.ok) throw new Error("Failed to fetch oembed");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
