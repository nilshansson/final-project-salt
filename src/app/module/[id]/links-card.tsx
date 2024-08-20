"use client"

import { postUtlink, revalidatePathCreateModule } from "@/actions/actions";
import { SelectUtlink } from "@/db/query";
import { UploadButton } from "@/utils/uploadthing";
import { revalidatePath } from "next/cache";
import Link from "next/link";

interface LinksProps{
  utlinks:SelectUtlink[]
  moduleId: number
}


export function LinksCard({utlinks, moduleId}:LinksProps){
  return (
    <>
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
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2"/>
          <div className="collapse-title text-xl font-medium">
            Links
            </div>
          <div className="collapse-content">
          {utlinks.map((utlink)=>(
            <div key={utlink.id}>
              <Link href={utlink.url}>
                <h3>
                {utlink.title}
                </h3>
              </Link>
            </div>
          ))}
          </div>
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
