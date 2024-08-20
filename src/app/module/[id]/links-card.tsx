"use client"

import { SelectUtlink } from "@/db/query";
import { UploadButton } from "@/utils/uploadthing";
import Link from "next/link";

interface LinksProps{
  utlinks:SelectUtlink[]
}


export function LinksCard({utlinks}:LinksProps){
  return (
    <>
      <UploadButton
        endpoint="fileUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
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
                <p>
                {utlink.description}
                </p>
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
