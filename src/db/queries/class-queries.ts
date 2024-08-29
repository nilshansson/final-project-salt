"use server";
import { eq } from "drizzle-orm";
import { db } from "..";
import { classes } from "../schema";

export type SelectClasses = typeof classes.$inferSelect;
export type InsertClasses = typeof classes.$inferInsert;
export async function selectAllClasses(): Promise<SelectClasses[]> {
  try {
    const allClasses = await db.select().from(classes);
    return allClasses;
  } catch (error) {
    console.log(error);
    throw new Error("could not get classes");
  }
}

export async function selectClass(classId: number): Promise<SelectClasses> {
  try {
    const [newClass] = await db
      .select()
      .from(classes)
      .where(eq(classes.id, classId));
    return newClass;
  } catch (error) {
    console.log(error);
    throw new Error("could not get class");
  }
}
export async function selectClassByName(
  className: string
): Promise<SelectClasses> {
  try {
    const [newClass] = await db
      .select()
      .from(classes)
      .where(eq(classes.name, className));
    return newClass;
  } catch (error) {
    console.log(error);
    throw new Error("could not get class");
  }
}
export async function createClass(newClass: InsertClasses) {
  try {
    const [createdClass] = await db.insert(classes).values(newClass).returning();
    return createdClass
  } catch (error) {
    console.error(error);
    throw new Error("could not create class");
  }
}

export async function editClass(
  classId: number,
  className: string,
  newStartDate: string | Date,
  newGradDate: string | Date,
  newPCDate: string | Date
) {
  try {
    const startDate =
      typeof newStartDate === "string" ? new Date(newStartDate) : newStartDate;
    const gradDate =
      typeof newGradDate === "string" ? new Date(newGradDate) : newGradDate;
    const pcDate =
      typeof newPCDate === "string" ? new Date(newPCDate) : newPCDate;
    console.log(classId, className, startDate, gradDate, pcDate);

    await db
      .update(classes)
      .set({
        name: className,
        startDate: startDate,
        gradDate: gradDate,
        precourseStartDate: pcDate,
      })
      .where(eq(classes.id, classId));
  } catch (error) {
    console.log(error);
    throw new Error("could not get classes");
  }
}

export async function deleteClass(classId: number) {
  try {
    await db.delete(classes).where(eq(classes.id, classId));
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
}

export async function getCourseDatesByClassId(classId: number | null) {
  if (!classId) {
    throw new Error("Invalid class ID");
  }

  const result = await db
    .select({
      precourseStart: classes.precourseStartDate,
      bootcampStart: classes.startDate,
    })
    .from(classes)
    .where(eq(classes.id, classId))
    .limit(1);

  if (result.length === 0) {
    throw new Error("No course dates found for the given class");
  }

  return result[0];
}
