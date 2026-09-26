import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    let fetchUrl = "";
    
    if (url.includes("tiktok.com") || url.includes("vt.tiktok.com")) {
      fetchUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
    } else if (url.includes("instagram.com")) {
      // Use Instagram's native oEmbed endpoint - works for public posts without auth token
      fetchUrl = `https://api.instagram.com/oembed/?url=${encodeURIComponent(url)}&hidecaption=true&omitscript=true`;
    } else {
      return NextResponse.json({ error: "Unsupported provider" }, { status: 400 });
    }

    const res = await fetch(fetchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("oEmbed fetch failed:", errorData);
      throw new Error("Failed to fetch oembed");
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
