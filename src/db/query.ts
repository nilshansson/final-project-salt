import { drizzle } from "drizzle-orm/node-postgres";
import { pool } from ".";
import { courseModules } from "./schema";

const db = drizzle(pool);

export async function insertCourseModule(title: string, intro: string | null) {
  try {
    const result = await db
      .insert(courseModules)
      .values({ title, intro })
      .returning();
    return result;
  } catch (error) {
    console.error("Failed to insert course module:", error);
    throw new Error("Failed to insert course module");
  }
}
