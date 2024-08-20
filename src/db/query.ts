import { drizzle } from "drizzle-orm/node-postgres";
import { db, pool } from ".";
import { courseModules, links, utlinks } from "./schema";
import { eq } from "drizzle-orm";

export type SelectModule = typeof courseModules.$inferSelect;
export type InsertModule = typeof courseModules.$inferInsert;
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

export type SelectUtlink = typeof utlinks.$inferSelect;
export type InsertUtlink = typeof utlinks.$inferInsert;
export async function insertUtlink(
  courseModulesId: number,
  url: string,
  title: string,
  description: string | null,
): Promise<InsertUtlink> {
  try {
    const utlink = await db
      .insert(utlinks)
      .values({ courseModulesId, url, title, description })
      .returning();
    return utlink[0];
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
}

export async function selectUtlinksByModule(
  moduleId: number,
): Promise<SelectUtlink[]> {
  try {
    const links = await db
      .select()
      .from(utlinks)
      .where(eq(utlinks.courseModulesId, moduleId));

    return links;
  } catch (error) {
    console.error("Failed to select utlinks:", error);
    throw new Error("Failed to select utlinks");
  }
}

export type SelectLink = typeof links.$inferSelect;
export type InsertLink = typeof links.$inferInsert;
export async function insertLink(
  courseModulesId: number,
  url: string,
  title: string,
): Promise<InsertLink> {
  try {
    const link = await db
      .insert(links)
      .values({ courseModulesId, url, title })
      .returning();
    return link[0];
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
}

export async function selectLinksByModule(
  moduleId: number,
): Promise<SelectLink[]> {
  try {
    const link = await db
      .select()
      .from(links)
      .where(eq(links.courseModulesId, moduleId));
    return link;
  } catch (error) {
    console.error("Failed to select utlinks:", error);
    throw new Error("Failed to select utlinks");
  }
}
