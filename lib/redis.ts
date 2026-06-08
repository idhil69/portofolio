import { Redis } from "@upstash/redis";

// Helper function to aggressively clean quotes and spaces from environment variables
function getCleanEnv(key: string): string {
  const value = process.env[key] || "";
  return value.replace(/^['"\s]+|['"\s]+$/g, "");
}

const url = getCleanEnv("UPSTASH_REDIS_REST_URL") || getCleanEnv("KV_REST_API_URL");
const token = getCleanEnv("UPSTASH_REDIS_REST_TOKEN") || getCleanEnv("KV_REST_API_TOKEN");

export const redis = new Redis({
  url: url,
  token: token,
});
