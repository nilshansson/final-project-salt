"use server";

import {
  addGitHubSaltiename,
  createClass,
  createStudentAndSaltieIfNotExists,
  deleteClass,
  deleteCourseModule,
  deleteLink,
  deleteUTLink,
  editClass,
  getAllStudentInfo,
  InsertClasses,
  insertCourseModule,
  insertLink,
  insertUtlink,
  SelectModule,
  SelectStudent,
  SelectSaltie,
  updateCourseModule,
  updateLinkDetails,
  updateUTLinkDetails,
} from "@/db/query";
import { fetchMetadata } from "@/utils/metadata";
import { SelectMode } from "drizzle-orm/query-builders/select.types";
import { link } from "fs";
import { revalidatePath } from "next/cache";

export async function postModule(title: string, intro: string, classId:number) {
  const postedModule = await insertCourseModule(title, intro, classId);
  return postedModule;
}

export async function postModuleAndRevalidate(title: string,
  intro: string,
  classId: number
): Promise<SelectModule> {
  // Insert the course module and get the posted module
  const postedModule = await insertCourseModule(title, intro, classId);

  // Ensure all properties required by SelectModule are present
  if (!postedModule.id) {
    throw new Error("Module ID is undefined. This should not happen.");
  }

  const moduleToReturn: SelectModule = {
    id: postedModule.id,
    classId: postedModule.classId,
    title: postedModule.title,
    intro: postedModule.intro ?? null, // Default to null if intro is undefined
    createdAt: postedModule.createdAt ?? new Date(), // Default to current date if createdAt is undefined
    updatedAt: postedModule.updatedAt ?? null, // Default to null if updatedAt is undefined
  };

  await revalidatePath("/admin/module");

  return moduleToReturn;
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
  saltieId: string,
  githubSaltiename: string
) {
  await addGitHubSaltiename(saltieId, githubSaltiename);
  await revalidatePath("/profile")
}
export async function handleCreateSaltieIfNotExist(
  saltieId: string,
  name: string
): Promise<{ saltie: SelectSaltie | null; student: SelectStudent | null }> {
  const { saltie, student } = await createStudentAndSaltieIfNotExists(saltieId, name);
  return { saltie, student };
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

export async function postClassAndRevalidate(newClass:InsertClasses) {
  try {
    const createdClass = await createClass(newClass);
    revalidatePath("/admin/module")
    return createdClass;
  } catch (error) {
    console.error(error);
    return false;
  }
}

