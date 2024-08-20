"use server"

import { insertCourseModule } from "@/db/query"

export async function postModule(title:string, intro:string){
  const postedModule = await insertCourseModule(title, intro);
  return postedModule;
}
