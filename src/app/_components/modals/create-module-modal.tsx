"use client";

import { ModuleForm } from "@/app/_components";
import { SelectClasses, SelectModule } from "@/db/query";
import { useEffect } from "react";

interface ModalProps {
  currClass: SelectClasses;
  addNewModule: (newModule: SelectModule) => void;
}

export function ModuleModal({ currClass, addNewModule }: ModalProps) {
  useEffect(() => {
    const modal = document.getElementById(
      "my_modal_5"
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
      "my_modal_5"
    ) as HTMLDialogElement | null;
    modal?.showModal();
  };

  const handleModuleCreated = (newModule: SelectModule) => {
    addNewModule(newModule);
  };

  return (
    <>
      <button
        className="bg-saltLightPink text-saltDarkPink py-3 px-5 rounded-full font-extrabold hover:bg-saltDarkPink hover:text-saltDarkBlue mb-2"
        onClick={openModal}
      >
        Create new module for {currClass.name}
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <ModuleForm
            currClass={currClass}
            onModuleCreated={handleModuleCreated}
          />
        </div>
      </dialog>
    </>
  );
}
