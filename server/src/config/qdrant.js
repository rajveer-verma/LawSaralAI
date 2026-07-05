import { QdrantClient } from "@qdrant/js-client-rest";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.QDRANT_URL) {
  throw new Error(
    "QDRANT_URL is missing in .env"
  );
}

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey:
    process.env.QDRANT_API_KEY || undefined,
  timeout: 30000,
});

export default client;