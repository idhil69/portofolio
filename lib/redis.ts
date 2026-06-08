import { Redis } from "@upstash/redis";

// Helper function to aggressively clean quotes and spaces from environment variables
function getCleanEnv(key: string): string {
  const value = process.env[key] || "";
  return value.replace(/^['"\\s]+|['"\\s]+$/g, "").trim();
}

// Try multiple env var names for maximum compatibility
// Vercel KV integration uses KV_REST_API_* 
// Manual Upstash setup uses UPSTASH_REDIS_REST_*
const url = getCleanEnv("KV_REST_API_URL") || getCleanEnv("UPSTASH_REDIS_REST_URL");
const token = getCleanEnv("KV_REST_API_TOKEN") || getCleanEnv("UPSTASH_REDIS_REST_TOKEN");

if (!url || !token) {
  console.warn(
    "⚠️ Redis/KV environment variables not found. Available vars:",
    {
      KV_REST_API_URL: !!process.env.KV_REST_API_URL,
      KV_REST_API_TOKEN: !!process.env.KV_REST_API_TOKEN,
      UPSTASH_REDIS_REST_URL: !!process.env.UPSTASH_REDIS_REST_URL,
      UPSTASH_REDIS_REST_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    }
  );
}

export const redis = new Redis({
  url: url || "https://placeholder.upstash.io",
  token: token || "placeholder",
});
