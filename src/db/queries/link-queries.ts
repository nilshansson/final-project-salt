"use server";
import { eq } from "drizzle-orm";
import { db } from "..";
import { utlinks, links } from "../schema";

export type SelectUtlink = typeof utlinks.$inferSelect;
export type InsertUtlink = typeof utlinks.$inferInsert;
export async function insertUtlink(
  courseModulesId: number,
  url: string,
  title: string,
  description: string | null,
): Promise<InsertUtlink> {
  try {
    const utlink = await db
      .insert(utlinks)
      .values({ courseModulesId, url, title, description })
      .returning();
    return utlink[0];
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
}

export async function selectUtlinksByModule(
  moduleId: number,
): Promise<SelectUtlink[]> {
  try {
    const links = await db
      .select()
      .from(utlinks)
      .where(eq(utlinks.courseModulesId, moduleId));

    return links;
  } catch (error) {
    console.error("Failed to select utlinks:", error);
    throw new Error("Failed to select utlinks");
  }
}

export type SelectLink = typeof links.$inferSelect;
export type InsertLink = typeof links.$inferInsert;
export async function insertLink(
  courseModulesId: number,
  url: string,
  title: string,
): Promise<InsertLink> {
  try {
    const link = await db
      .insert(links)
      .values({ title, courseModulesId, url })
      .returning();
    return link[0];
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
}

export async function selectLinksByModule(
  moduleId: number,
): Promise<SelectLink[]> {
  try {
    const link = await db
      .select()
      .from(links)
      .where(eq(links.courseModulesId, moduleId));
    return link;
  } catch (error) {
    console.error("Failed to select utlinks:", error);
    throw new Error("Failed to select utlinks");
  }
}

export interface combinedLink {
  id: number;
  title: string;
  description: string | null;
  courseModulesId: number;
  url: string;
  isUploadThing: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

export async function selectAllLinksByModule(
  moduleId: number,
): Promise<combinedLink[]> {
  const [links, utlinks] = await Promise.all([
    selectLinksByModule(moduleId),
    selectUtlinksByModule(moduleId),
  ]);

  const processedLinks = links.map((link) => ({
    ...link,
    isUploadThing: false,
  }));

  const processedUtlinks = utlinks.map((utlink) => ({
    ...utlink,
    isUploadThing: true,
  }));

  const combinedLinks: combinedLink[] = [
    ...processedLinks,
    ...processedUtlinks,
  ];
  return combinedLinks;
}

1;
// Update regular link
export async function updateLinkDetails(
  linkId: number,
  title: string,
  url: string,
) {
  await db.update(links).set({ title, url }).where(eq(links.id, linkId));
}

// Update uploadthing link
export async function updateUTLinkDetails(
  linkId: number,
  title: string,
  url: string,
) {
  await db.update(utlinks).set({ title, url }).where(eq(utlinks.id, linkId));
}

// Delete regular link
export async function deleteLink(linkId: number) {
  await db.delete(links).where(eq(links.id, linkId));
}

// Delete uploadthing link
export async function deleteUTLink(linkId: number) {
  await db.delete(utlinks).where(eq(utlinks.id, linkId));
}
