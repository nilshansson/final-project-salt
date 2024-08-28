"use server";

import { eq, inArray } from "drizzle-orm";
import { db } from "..";
import { users, students } from "../schema";

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type SelectStudent = typeof students.$inferSelect;
export type InsertStudent = typeof students.$inferInsert;

export async function createStudentAndUserIfNotExists(
  userId: string,
  name: string
): Promise<{ user: SelectUser | null; student: SelectStudent | null }> {
  const existingStudent = await db
    .select()
    .from(students)
    .where(eq(students.userId, userId))
    .then((result) => result[0] || null);

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .then((result) => result[0] || null);

  let newUser = existingUser;
  let newStudent = existingStudent;

  if (!existingUser) {
    [newUser] = await db
      .insert(users)
      .values({
        id: userId,
        role: "student",
      })
      .returning();
  }

  if (!existingStudent) {
    [newStudent] = await db
      .insert(students)
      .values({
        userId: userId,
        name: name,
      })
      .returning();
  }

  if (newUser !== existingUser || newStudent !== existingStudent) {
    console.log("CREATED NEW OBJECTS\n\n\n");
    console.log(newUser);
    console.log(newStudent);
  } else {
    console.log("RETRIEVED EXISTING OBJECTS\n\n\n");
    console.log(newUser);
    console.log(newStudent);
  }

  return { user: newUser, student: newStudent };
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

export async function addGitHubUsername(
  userId: string,
  githubUsername: string
) {
  await db
    .update(students)
    .set({ github: githubUsername })
    .where(eq(students.userId, userId));
}

export async function getStudentInfo(userId: string) {
  const Userinfo = await db
    .select()
    .from(students)
    .where(eq(students.userId, userId));
  return Userinfo;
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
