"use client";

import { postUtlink, revalidatePathCreateModule } from "@/actions/actions";
import { combinedLink, SelectLink, SelectUtlink } from "@/db/query";
import { UploadButton } from "@/utils/uploadthing";
import Link from "next/link";
import LinkPoster from "./link-poster";

export interface LinksProps {
  links: combinedLink[];
  moduleId: number;
}

export function LinksCard({ links, moduleId }: LinksProps) {
  return (
    <>
      <div className="card bg-saltLightPink flex-col p-4">
        <h2 className="text-center text-sm text-saltDarkPink">Links</h2>
        <div className="card bg-base-200 p-4 mt-4">
          {links.map((link) => (
            <div key={link.id}>
              <Link href={link.url}>
                <div className="card bg-base-300  m-2">
                  <h3 className="text-center text-lg px-3 text-saltDarkPink">
                    {link.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <LinkPoster moduleId={moduleId} />

        <div className="w-full flex flex-col justify-center my-4">
          <p className="text-center font-semibold text-saltDarkPink">
            Or upload a file:
          </p>
          <UploadButton
            endpoint="fileUploader"
            appearance={{
              button: {
                background: "#0F2D45",
                color: "white",
              },
            }}
            onClientUploadComplete={(res) => {
              postUtlink(moduleId, res[0].name, res[0].url);
              console.log("Files: ", res);
              alert("Upload Completed");
              revalidatePathCreateModule();
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </div>
    </>
  );
}

// <div className="collapse collapse-arrow bg-base-200">
//   <input type="radio" name="my-accordion-2" />
//   <div className="collapse-title text-xl font-medium">docs</div>
//   <div className="collapse-content">
//     <p>here is the doc link</p>
//   </div>
//
//   {}
// </div>
// <div className="collapse collapse-arrow bg-base-200">
//   <input type="radio" name="my-accordion-2" />
//   <div className="collapse-title text-xl font-medium">katas</div>
//   <div className="collapse-content">
//     <p>here is the codewars kata</p>
//   </div>
// </div>
