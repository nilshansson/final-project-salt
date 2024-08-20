"use client"

import { postUtlink, revalidatePathCreateModule } from "@/actions/actions";
import { SelectLink, SelectUtlink } from "@/db/query";
import { UploadButton } from "@/utils/uploadthing";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import LinkPoster from "./link-poster";

interface LinksProps{
  utlinks:SelectUtlink[]
  links:SelectLink[]
  moduleId: number
}


export function LinksCard({utlinks, links, moduleId}:LinksProps){

  return (
    <>
    <div className="card bg-base-200 flex-row p-4">
      <LinkPoster moduleId={moduleId}/>
      <UploadButton
        endpoint="fileUploader"
        onClientUploadComplete={(res) => {
          postUtlink(moduleId, res[0].name, res[0].url)
          console.log("Files: ", res);
          alert("Upload Completed");
          revalidatePathCreateModule()
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      </div>
        <div className="card bg-base-200 p-4 mt-4">
          {utlinks.map((utlink)=>(
            <div key={utlink.id}>
              <Link href={utlink.url}>
              <div className="card bg-base-300 p-2 m-2">
                <h3>
                {utlink.title}
                </h3>
                </div>
              </Link>
            </div>
          ))}
          {links.map((link)=>(
            <div key={link.id}>
            <Link href={link.url}>
            <div className="card bg-base-300 p-2 m-2">
            <h3>
              {link.title}
              </h3>
              </div>
            </Link>

            </div>
          ))}
          </div>
        </>

  )
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
