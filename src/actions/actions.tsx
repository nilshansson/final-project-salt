"use server";

import {
  addGitHubUsername,
  createClass,
  createStudentAndUserIfNotExists,
  deleteClass,
  deleteCourseModule,
  deleteLink,
  deleteUTLink,
  editClass,
  getAllStudentInfo,
  insertCourseModule,
  insertLink,
  insertUtlink,
  SelectStudent,
  SelectUser,
  updateCourseModule,
  updateLinkDetails,
  updateUTLinkDetails,
} from "@/db/query";
import { fetchMetadata } from "@/utils/metadata";
import { link } from "fs";
import { revalidatePath } from "next/cache";

export async function postModule(title: string, intro: string, classId:number) {
  const postedModule = await insertCourseModule(title, intro, classId);
  return postedModule;
}

export async function postModuleAndRevalidate(title: string, intro: string, classId:number) {
  const postedModule = await insertCourseModule(title, intro, classId);
  await revalidatePath("/admin/module")
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
  await revalidatePathCreateModule();
  return link;
}

export async function updateClassAndRevalidate(classId:number, className:string, startDate:Date, gradDate:Date, preCDate:Date){
  await editClass(classId, className, startDate, gradDate, preCDate);
  await revalidatePath("/admin/module")
}

export async function updateModuleDetailsAndRevalidate(moduleId:number, updatedTitle:string, updatedIntro:string){
  await updateCourseModule(moduleId, updatedTitle, updatedIntro)
  await revalidatePath("/admin/module")
}

export async function deleteClassAndRevalidate(classId:number){
  await deleteClass(classId)
  await revalidatePath("/admin/module")
}

export async function deleteModuleAndRevalidate(moduleId:number){
  await deleteCourseModule(moduleId)
  await revalidatePath("admin/module")
}

export async function revalidatePathCreateModule() {
  await revalidatePath("/admin/create-module/");
}
export async function handleAddGithubToDB(
  userId: string,
  githubUsername: string
) {
  await addGitHubUsername(userId, githubUsername);
  await revalidatePath("/profile")
}
export async function handleCreateUserIfNotExist(
  userId: string,
  name: string
): Promise<{ user: SelectUser | null; student: SelectStudent | null }> {
  const { user, student } = await createStudentAndUserIfNotExists(userId, name);
  return { user, student };
}

export async function updateLinkDetailsRevalidate(linkId: number, title: string, url: string) {
  await updateLinkDetails(linkId, title, url)
  await revalidatePath("admin/module")
}

// Update uploadthing link
export async function updateUTLinkDetailsRevalidate(linkId: number, title: string, url: string) {
  await updateUTLinkDetails(linkId, title, url)
  await revalidatePath("admin/module")
}

// Delete regular link
export async function deleteLinkRevalidate(linkId: number) {
  await deleteLink(linkId)
  await revalidatePath("admin/module")
}

// Delete uploadthing link
export async function deleteUTLinkRevalidate(linkId: number) {
  await deleteUTLink(linkId)
  await revalidatePath("admin/module")
}

export async function postClassAndRevalidate(name: string, startDate: Date, gradDate: Date) {
  try {
    const newClass = {
      name,
      startDate,
      gradDate,
    };

    await createClass(newClass);
    await revalidatePath("admin/module")
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

