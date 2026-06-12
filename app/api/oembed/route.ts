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
    } else if (url.includes("instagram.com")) {
      const igToken = process.env.IG_ACCESS_TOKEN || "EAAwYFX5QNZAQBRiFb18ZAcueYZBgUwgKpUXB84qbLvL6f0seMkYHSDAn1YehA2GYbrvsZBTHiC6pgMk1rSS9cGLLi2GYtDbmxkZBXuZBVKPTRT71q14Urzg2p7DWqZAyR3krxfhHtx4aZCHzZCZBzvz8OvGk1snwxIOqOcpFd9Y4KecDeDBPtYeNA4iOEJ8l0cFdQJhAqGnmSOAkgcMjeFF8vnNMWnlcbhmoMGgrQZCXY0G8RaCHmc6gezKKNVCftomCfa7FDAJEzVw9Y6CKeDHYyty4ujk2EvI8CnPtwZDZD";
      fetchUrl = `https://graph.facebook.com/v19.0/instagram_oembed?url=${encodeURIComponent(url)}&access_token=${igToken}`;
    } else {
      return NextResponse.json({ error: "Unsupported provider" }, { status: 400 });
    }

    const res = await fetch(fetchUrl);
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
