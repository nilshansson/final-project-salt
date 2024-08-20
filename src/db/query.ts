import { drizzle } from "drizzle-orm/node-postgres";
import { pool } from ".";
import { courseModules } from "./schema";
import { eq } from "drizzle-orm";

const db = drizzle(pool);

type SelectModule = typeof courseModules.$inferSelect;
type InsertModule = typeof courseModules.$inferInsert;
export async function insertCourseModule(
  title: string,
  intro: string | null,
): Promise<InsertModule> {
  try {
    const result = await db
      .insert(courseModules)
      .values({ title, intro })
      .returning();
    return result[0];
  } catch (error) {
    console.error("Failed to insert course module:", error);
    throw new Error("Failed to insert course module");
  }
}

export async function selectCourseModule(id: number): Promise<SelectModule> {
  try {
    const module = await db
      .select()
      .from(courseModules)
      .where(eq(courseModules.id, id));
    return module[0];
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
}
