"use client";

import { postUtlink, revalidatePathCreateModule } from "@/actions/actions";
import { combinedLink } from "@/db/query";
import { useEffect } from "react";
import { UploadButton } from "@/utils/uploadthing";
import LinkPoster from "@/app/module/[id]/link-poster";

interface ModalProps {
  moduleId: number;
  addNewLink: (newLink: combinedLink) => void; // Pass the callback function here
}

export function LinkModal({ moduleId, addNewLink }: ModalProps) {
  useEffect(() => {
    const modal = document.getElementById(
      "my_modal_6"
    ) as HTMLDialogElement | null;

    const handleBackdropClick = (event: MouseEvent) => {
      if (modal && event.target === modal) {
        modal.close();
      }
    };

    modal?.addEventListener("click", handleBackdropClick);

    return () => {
      modal?.removeEventListener("click", handleBackdropClick);
    };
  }, []);

  const openModal = () => {
    const modal = document.getElementById(
      "my_modal_6"
    ) as HTMLDialogElement | null;
    modal?.showModal();
  };

  const handleLinkAdded = async (name: string, url: string) => {
    const postedLink = await postUtlink(moduleId, name, url);

    if (!postedLink.id) {
      throw new Error("Link ID is undefined. This should not happen.");
    }

    const newLink: combinedLink = {
      ...postedLink,
      isUploadThing: true,
      id: postedLink.id,
      description: postedLink.description ?? null,
      createdAt: postedLink.createdAt!,
      updatedAt: postedLink.updatedAt!,
    };

    addNewLink(newLink); // Call the parent callback function to add the link
    alert("Upload Completed");
    revalidatePathCreateModule();
  };

  return (
    <>
      <button
        className=" text-white bg-saltOrange  px-4 font-semibold rounded-full"
        onClick={openModal}
      >
        Add link
      </button>
      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <LinkPoster moduleId={moduleId} onLinkAdded={addNewLink} />
          <UploadButton
            endpoint="fileUploader"
            onClientUploadComplete={(res) => {
              handleLinkAdded(res[0].name, res[0].url);
              console.log("Files: ", res);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </dialog>
    </>
  );
}
