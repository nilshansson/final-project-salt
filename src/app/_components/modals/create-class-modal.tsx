"use client";

import { postModule } from "@/actions/actions";
import { ClassForm } from "@/app/_components";
import { SelectClasses } from "@/db/query";
import { revalidatePath } from "next/cache";
import { useState, useEffect } from "react";

export function ClassModal() {
  useEffect(() => {
    const modal = document.getElementById(
      "class_modal"
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
      "class_modal"
    ) as HTMLDialogElement | null;
    modal?.showModal();
  };

  return (
    <>
      <button
        className="bg-saltOrange text-white py-3 px-5 rounded-full font-extrabold hover:bg-saltDarkPink mb-2"
        onClick={openModal}
      >
        Create new class
      </button>
      <dialog id="class_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <ClassForm />
        </div>
      </dialog>
    </>
  );
}
