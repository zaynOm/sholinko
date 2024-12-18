import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXT_APPWRITE_KEY: z.string(),
    NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
    NEXT_PUBLIC_APPWRITE_PROJECT: z.string(),
    DATABASE_ID: z.string(),
    COLLECTION_LINKS_ID: z.string(),
  },
});
