"use client";

import { postModule } from "@/actions/actions";
import { SelectClasses } from "@/db/query";
import { useState, useEffect } from "react";
import { ModuleForm } from "../create-module/module-form";
import { ClassForm } from "./class-form";



export function ClassModal() {
  useEffect(() => {
    const modal = document.getElementById('class_modal') as HTMLDialogElement | null;

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
    const modal = document.getElementById('class_modal') as HTMLDialogElement | null;
    modal?.showModal();
  };

  return (
    <>
      <button className="btn" onClick={openModal}>
        Create new class
      </button>
      <dialog id="class_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
        <ClassForm/>
        </div>
      </dialog>
    </>
  );
}
