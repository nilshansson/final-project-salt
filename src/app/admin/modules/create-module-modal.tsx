"use client";

import { postModule } from "@/actions/actions";
import { SelectClasses } from "@/db/query";
import { useState, useEffect } from "react";
import { ModuleForm } from "./module-form";

interface ModalProps {
  currClass: SelectClasses;
}

export function ModuleModal({ currClass }: ModalProps) {
  useEffect(() => {
    const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null;

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
    const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null;
    modal?.showModal();
  };

  return (
    <>
      <button className="btn" onClick={openModal}>
        Create new module for {currClass.name}
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <ModuleForm currClass={currClass} />
        </div>
      </dialog>
    </>
  );
}
