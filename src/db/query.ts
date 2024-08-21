import { drizzle } from "drizzle-orm/node-postgres";
import { db, pool } from ".";
import { courseModules, links, students, utlinks, users } from "./schema";
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
    const smodule = await db
      .select()
      .from(courseModules)
      .where(eq(courseModules.id, id));
    return smodule[0];
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
}

export async function selectAllCourseModules(): Promise<SelectModule[]> {
  try {
    const modules = await db.select().from(courseModules);
    return modules;
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

export type SelectUser = typeof users.$inferSelect;
export type SelectStudent = typeof students.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type InsertStudent = typeof students.$inferInsert;

export async function createStudentAndUserIfNotExists(
  userId: string,
  name: string,
): Promise<{ user: SelectUser | null; student: SelectStudent | null }> {
  const existingStudent = await db
    .select()
    .from(students)
    .where(eq(students.userId, userId))
    .then((result) => result[0] || null); // Ensure a single object or null

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .then((result) => result[0] || null); // Ensure a single object or null

  if (!existingStudent && !existingUser) {
    const [newStudent] = await db
      .insert(students)
      .values({
        userId: userId,
        name: name,
      })
      .returning();

    const [newUser] = await db
      .insert(users)
      .values({
        id: userId,
        role: "student",
      })
      .returning();

    return { user: newUser, student: newStudent };
  }

  return { user: existingUser, student: existingStudent };
}
export async function addGitHubUsername(
  userId: string,
  githubUsername: string,
) {
  await db
    .update(students)
    .set({ github: githubUsername })
    .where(eq(students.userId, userId));
}

export async function getGithubUserInfo(userId: string) {
  const Userinfo = await db
    .select()
    .from(students)
    .where(eq(students.userId, userId));
  return Userinfo;
}
