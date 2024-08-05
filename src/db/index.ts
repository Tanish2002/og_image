import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "./schema";

const queryClient = neon(process.env.DB_URL as string);

export const db = drizzle(queryClient, { schema });
