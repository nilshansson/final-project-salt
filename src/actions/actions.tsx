"use server";

import {
  addGitHubUsername,
  createStudentandUserIfNotExists,
  insertCourseModule,
  insertLink,
  insertUtlink,
} from "@/db/query";
import { fetchMetadata } from "@/utils/metadata";
import { revalidatePath } from "next/cache";

export async function postModule(title: string, intro: string) {
  const postedModule = await insertCourseModule(title, intro);
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

export async function revalidatePathCreateModule() {
  revalidatePath("/admin/create-module/");
}
export async function handleAddGithubToDB(
  userId: string,
  githubUsername: string
) {
  await addGitHubUsername(userId, githubUsername);
}
export async function handleCreateUserIfNotExist(userId: string, name: string) {
  await createStudentandUserIfNotExists(userId, name);
}
