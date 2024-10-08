"use server";

import { eq, inArray } from "drizzle-orm";
import { db } from "..";
import { salties, students } from "../schema";

export type SelectSaltie = typeof salties.$inferSelect;
export type InsertSaltie = typeof salties.$inferInsert;

export type SelectStudent = typeof students.$inferSelect;
export type InsertStudent = typeof students.$inferInsert;

export async function createStudentAndSaltieIfNotExists(
  saltieId: string,
  name: string
): Promise<{ saltie: SelectSaltie | null; student: SelectStudent | null }> {
  const existingStudent = await db
    .select()
    .from(students)
    .where(eq(students.saltieId, saltieId))
    .then((result) => result[0] || null);

  const existingSaltie = await db
    .select()
    .from(salties)
    .where(eq(salties.id, saltieId))
    .then((result) => result[0] || null);

  let newSaltie = existingSaltie;
  let newStudent = existingStudent;

  if (!existingSaltie) {
    [newSaltie] = await db
      .insert(salties)
      .values({
        id: saltieId,
        role: "student",
      })
      .returning();
  }

  if (!existingStudent) {
    [newStudent] = await db
      .insert(students)
      .values({
        saltieId: saltieId,
        name: name,
      })
      .returning();
  }

  if (newSaltie !== existingSaltie || newStudent !== existingStudent) {
    console.log("CREATED NEW OBJECTS\n\n\n");
    console.log(newSaltie);
    console.log(newStudent);
  } else {
    console.log("RETRIEVED EXISTING OBJECTS\n\n\n");
    console.log(newSaltie);
    console.log(newStudent);
  }

  return { saltie: newSaltie, student: newStudent };
}
export async function updateClassOnStudentorStudents(
  newClassId: number,
  studentIds: number[]
) {
  try {
    await db
      .update(students)
      .set({ classId: newClassId })
      .where(inArray(students.id, studentIds));
  } catch (error) {
    throw new Error("Could not update classes for the selected students");
  }
}

export async function addGitHubSaltiename(
  saltieId: string,
  githubSaltiename: string
) {
  await db
    .update(students)
    .set({ github: githubSaltiename })
    .where(eq(students.saltieId, saltieId));
}

export async function getStudentInfo(saltieId: string) {
  const Saltieinfo = await db
    .select()
    .from(students)
    .where(eq(students.saltieId, saltieId));
  return Saltieinfo;
}

export async function getAllStudentInfo() {
  try {
    const allStudentInfo = await db.select().from(students);
    console.log("Fetched students:", allStudentInfo);
    return allStudentInfo ?? [];
  } catch (error) {
    console.error("Failed to fetch students:", error);
    return [];
  }
}
