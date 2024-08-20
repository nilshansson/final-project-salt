"use server"

import { insertCourseModule, insertUtlink } from "@/db/query"
import { revalidatePath } from "next/cache";

export async function postModule(title:string, intro:string){
  const postedModule = await insertCourseModule(title, intro);
  return postedModule;
}

export async function postUtlink(courseModuleId:number, title:string, url:string){
  const utlink = await insertUtlink(courseModuleId, url, title, null)
  return utlink
}

export async function revalidatePathCreateModule(){
  revalidatePath("/admin/create-module/")
}
