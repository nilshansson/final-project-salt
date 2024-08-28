"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { courseModules } from "../schema";

export type SelectModule = typeof courseModules.$inferSelect;
export type InsertModule = typeof courseModules.$inferInsert;
export async function insertCourseModule(
  title: string,
  intro: string | null,
  classId: number
): Promise<InsertModule> {
  try {
    const result = await db
      .insert(courseModules)
      .values({ title, intro, classId })
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

export async function selectAllCourseModulesByClassId(
  classId: number
): Promise<SelectModule[]> {
  try {
    const allClasses = await db
      .select()
      .from(courseModules)
      .where(eq(courseModules.classId, classId));
    return allClasses;
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
}

export async function updateCourseModule(
  moduleId: number,
  updatedTitle: string,
  updatedIntro: string
) {
  try {
    await db
      .update(courseModules)
      .set({ title: updatedTitle, intro: updatedIntro })
      .where(eq(courseModules.id, moduleId));
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
}

export async function deleteCourseModule(moduleId: number) {
  try {
    await db.delete(courseModules).where(eq(courseModules.id, moduleId));
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
}
