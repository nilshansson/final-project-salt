"use server";

import {
  addGitHubUsername,
  createStudentAndUserIfNotExists,
  editClassName,
  getAllStudentInfo,
  insertCourseModule,
  insertLink,
  insertUtlink,
  SelectStudent,
  SelectUser,
} from "@/db/query";
import { fetchMetadata } from "@/utils/metadata";
import { revalidatePath } from "next/cache";

export async function postModule(title: string, intro: string, classId:number) {
  const postedModule = await insertCourseModule(title, intro, classId);
  return postedModule;
}

export async function postModuleAndRevalidate(title: string, intro: string, classId:number) {
  const postedModule = await insertCourseModule(title, intro, classId);
  revalidatePath("/admin/module")
  return postedModule;
}

export async function postUtlink(
  courseModuleId: number,
  title: string,
  url: string
) {
  const utlink = await insertUtlink(courseModuleId, url, title, null);
  return utlink;
}

export async function postLink(courseModuleId: number, url: string) {
  "use server";
  const metadata = await fetchMetadata(url);
  if (!metadata) {
    throw new Error("unable to get metadata");
  }
  const link = await insertLink(courseModuleId, url, metadata.title);
  revalidatePathCreateModule();
  return link;
}

export async function updateClassNameAndRevalidate(classId:number, className:string){
  await editClassName(classId, className);
  revalidatePath("/admin/module")
}

export async function revalidatePathCreateModule() {
  revalidatePath("/admin/create-module/");
}
export async function handleAddGithubToDB(
  userId: string,
  githubUsername: string
) {
  await addGitHubUsername(userId, githubUsername);
  revalidatePath("/profile")
}
export async function handleCreateUserIfNotExist(
  userId: string,
  name: string
): Promise<{ user: SelectUser | null; student: SelectStudent | null }> {
  const { user, student } = await createStudentAndUserIfNotExists(userId, name);
  return { user, student };
}
