import { NextResponse } from "next/server";

export async function GET() {
  const vars = ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "KV_REST_API_URL", "KV_REST_API_TOKEN", "KV_URL", "BLOB_READ_WRITE_TOKEN"];
  const debug: any = {};
  
  for (const key of vars) {
    const val = process.env[key] || "";
    debug[key] = {
      length: val.length,
      startsWithHttps: val.startsWith("https"),
      startsWithRediss: val.startsWith("rediss"),
      first10: val.substring(0, 10),
      last10: val.substring(val.length - 10),
      hasQuotes: val.includes('"') || val.includes("'"),
    };
  }
  
  return NextResponse.json(debug);
}
