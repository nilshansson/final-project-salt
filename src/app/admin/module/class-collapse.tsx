"use client";

import { combinedLink, editClassName, SelectClasses, SelectModule } from "@/db/query";
import Link from "next/link";
import { useState } from "react";
import ModuleCollapse from "./module-collapse";
import { revalidatePath } from "next/cache";
import { updateClassNameAndRevalidate } from "@/actions/actions";

interface moduleWithLinks {
  module: SelectModule;
  links: combinedLink[];
}

interface classesWithModules {
  class: SelectClasses;
  modules: SelectModule[];
}

interface classesWithModulesWithLinks {
  class: SelectClasses;
  moduleWLink: moduleWithLinks[];
}

interface ClassCollapseProps {
  allClassesWithModules: classesWithModulesWithLinks[];
}

export default function ClassCollapse({ allClassesWithModules }: ClassCollapseProps) {
  const [editingClassId, setEditingClassId] = useState<number | null>(null);
  const [updatedClassName, setUpdatedClassName] = useState<string>("");
  const [openClassId, setOpenClassId] = useState<number | null>(null);

  const handleEditClick = (classId: number, currentName: string) => {
    setEditingClassId(classId);
    setUpdatedClassName(currentName);
  };

  const handleSaveClick = async (classId: number) => {
    await updateClassNameAndRevalidate(classId, updatedClassName)
    setEditingClassId(null);
  };

  const handleCancelClick = () => {
    setEditingClassId(null);
    setUpdatedClassName("");
  };

  const toggleCollapse = (classId: number) => {
    if (openClassId === classId) {
      setOpenClassId(null);
    } else {
      setOpenClassId(classId);
    }
  };

  return (
    <>
      {allClassesWithModules.map(({ class: currClass, moduleWLink }) => (
        <div key={currClass.id} className="collapse bg-base-100 prose lg:prose-lg">
          <input
            type="checkbox"
            checked={openClassId === currClass.id}
            onChange={() => toggleCollapse(currClass.id)}
          />
          <div className="collapse-title text-3xl font-bold flex justify-between items-center p-6 relative">
            {editingClassId === currClass.id ? (
              <div className="flex space-x-2 w-full relative z-10">
                <input
                  type="text"
                  value={updatedClassName}
                  onChange={(e) => setUpdatedClassName(e.target.value)}
                  className="input input-bordered  input-lg flex-grow"
                  style={{ pointerEvents: "auto" }}
                />
                <button
                  onClick={() => handleSaveClick(currClass.id)}
                  className="btn text-white btn-success"
                  style={{ pointerEvents: "auto" }}
                >
              <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  className="w-9 h-9"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M5 13l4 4L19 7"
  />
</svg>
                </button>
                <button
                  onClick={handleCancelClick}
                  className="btn text-white btn-error"
                  style={{ pointerEvents: "auto" }}
                >
                 <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-9 w-9"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12" />
  </svg>
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <span>{currClass.name}</span>
                {openClassId === currClass.id && (
                <button
                  onClick={() => handleEditClick(currClass.id, currClass.name)}
                  className="btn text-3xl btn-warning relative z-10"
                  style={{ pointerEvents: "auto" }}
                >
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  className="w-6 h-6"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M15.232 5.232l3.536 3.536m-2.036-4.036a2.5 2.5 0 113.536 3.536l-12 12a2 2 0 01-.878.487l-4 1a1 1 0 01-1.213-1.213l1-4a2 2 0 01.487-.878l12-12z"
  />
</svg>

                </button>
                )}
              </div>
            )}
          </div>
          <div className="collapse-content p-0">
            <ModuleCollapse allModulesWithLinks={moduleWLink}/>
          </div>
        </div>
      ))}
    </>
  );
}
