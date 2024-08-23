"use client";

import { postModule, postUtlink, revalidatePathCreateModule } from "@/actions/actions";
import { SelectModule } from "@/db/query";
import { useState, useEffect } from "react";
import { ModuleForm } from "../create-module/module-form";
import { UploadButton } from "@/utils/uploadthing";
import LinkPoster from "@/app/module/[id]/link-poster";

interface ModalProps {
  currModule: SelectModule;
}

export function LinkModal({ currModule }: ModalProps) {
  useEffect(() => {
    const modal = document.getElementById('my_modal_6') as HTMLDialogElement | null;

    const handleBackdropClick = (event: MouseEvent) => {
      if (modal && event.target === modal) {
        modal.close();
      }
    };

    modal?.addEventListener('click', handleBackdropClick);

    return () => {
      modal?.removeEventListener('click', handleBackdropClick);
    };
  }, []);

  const openModal = () => {
    const modal = document.getElementById('my_modal_6') as HTMLDialogElement | null;
    modal?.showModal();
  };

  return (
    <>
      <button className="btn" onClick={openModal}>
        Add link
      </button>
      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
      <LinkPoster moduleId={currModule.id}/>
      <UploadButton
        endpoint="fileUploader"
        onClientUploadComplete={(res) => {
          postUtlink(currModule.id, res[0].name, res[0].url)
          console.log("Files: ", res);
          alert("Upload Completed");
          revalidatePathCreateModule()
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
