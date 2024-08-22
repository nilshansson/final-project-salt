
"use client";

import { combinedLink } from "@/db/query";
import Link from "next/link";

interface LinkBoxProps {
  moduleId: number;
  links: combinedLink[];
}

export function LinkBoxes({ moduleId, links }: LinkBoxProps) {
  return (
    <>
      {links.map((link, index) => (
        <div
          key={`${moduleId}-${link.id}-${index}`} // Combine moduleId, link.id, and index for uniqueness
          className="card bg-base-300 p-2 my-1"
        >
          <Link href={link.url}>{link.title}</Link>
        </div>
      ))}
    </>
  );
}
