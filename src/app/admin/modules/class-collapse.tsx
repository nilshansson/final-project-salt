"use client";

import {
  combinedLink,
  selectAllCourseModulesByClassId,
  selectAllLinksByModule,
  SelectClasses,
  SelectModule,
} from "@/db/query";
import { useState, useEffect } from "react";
import ModuleCollapse from "./module-collapse";
import {
  deleteClassAndRevalidate,
  updateClassAndRevalidate,
} from "@/actions/actions";
import { ModuleModal } from "@/app/_components";

interface moduleWithLinks {
  module: SelectModule;
  links: combinedLink[];
}

interface classesWithModulesWithLinks {
  class: SelectClasses;
  moduleWLink: moduleWithLinks[];
}

interface ClassCollapseProps {
  allClasses: SelectClasses[];
}

export default function ClassCollapse({ allClasses }: ClassCollapseProps) {
  const [editingClassId, setEditingClassId] = useState<number | null>(null);
  const [updatedClassName, setUpdatedClassName] = useState<string>("");
  const [updatedStartDate, setUpdatedStartDate] = useState<string>("");
  const [updatedGradDate, setUpdatedGradDate] = useState<string>("");
  const [updatedPrecourseStartDate, setUpdatedPrecourseStartDate] = useState<string>("");
  const [openClassId, setOpenClassId] = useState<number | null>(null);
  const [modules, setModules] = useState<SelectModule[]>([]);
  const [isLoadingModules, setIsLoadingModules] = useState<boolean>(false);

  const handleEditClick = (
    classId: number,
    currentName: string,
    startDate: Date,
    gradDate: Date,
    precourseStartDate: Date
  ) => {
    setEditingClassId(classId);
    setUpdatedClassName(currentName);
    setUpdatedStartDate(startDate.toISOString().split("T")[0]); // Convert to YYYY-MM-DD
    setUpdatedGradDate(gradDate.toISOString().split("T")[0]); // Convert to YYYY-MM-DD
    setUpdatedPrecourseStartDate(precourseStartDate.toISOString().split("T")[0]); // Convert to YYYY-MM-DD
  };

  const handleSaveClick = async (classId: number) => {
    await updateClassAndRevalidate(
      classId,
      updatedClassName,
      new Date(updatedStartDate),
      new Date(updatedGradDate),
      new Date(updatedPrecourseStartDate)
    );
    setEditingClassId(null);
  };

  const handleCancelClick = () => {
    setEditingClassId(null);
    setUpdatedClassName("");
    setUpdatedStartDate("");
    setUpdatedGradDate("");
    setUpdatedPrecourseStartDate("");
  };

  const handleDeleteClick = async (classId: number) => {
    await deleteClassAndRevalidate(classId);
  };

  const toggleCollapse = async (classId: number) => {
    if (openClassId === classId) {
      setOpenClassId(null);
      setModules([]);
    } else {
      setOpenClassId(classId);
      setIsLoadingModules(true);

      // Fetch modules and links for the selected class
      const newModules = await selectAllCourseModulesByClassId(classId);
      setModules(newModules)
      setIsLoadingModules(false);
    }
  };

  return (
    <>
      {allClasses.map((currClass) => (
        <div
          key={"classCollapse" + currClass.id}
          className="collapse bg-base-100 prose lg:prose-lg"
        >
          <input
            type="checkbox"
            checked={openClassId === currClass.id}
            onChange={() => toggleCollapse(currClass.id)}
          />
          <div className="collapse-title text-3xl font-bold flex justify-between items-center p-6 relative">
            {editingClassId === currClass.id ? (
              <div className="flex flex-col space-y-2 w-full relative z-10">
                <input
                  type="text"
                  value={updatedClassName}
                  onChange={(e) => setUpdatedClassName(e.target.value)}
                  className="input input-bordered input-lg flex-grow"
                  style={{ pointerEvents: "auto" }}
                />
                <label className="font-semibold">Start Date:</label>
                <input
                  type="date"
                  value={updatedStartDate}
                  onChange={(e) => setUpdatedStartDate(e.target.value)}
                  className="input input-bordered input-sm"
                  style={{ pointerEvents: "auto" }}
                />
                <label className="font-semibold">Graduation Date:</label>
                <input
                  type="date"
                  value={updatedGradDate}
                  onChange={(e) => setUpdatedGradDate(e.target.value)}
                  className="input input-bordered input-sm"
                  style={{ pointerEvents: "auto" }}
                />
                <label className="font-semibold">Precourse Start Date:</label>
                <input
                  type="date"
                  value={updatedPrecourseStartDate}
                  onChange={(e) => setUpdatedPrecourseStartDate(e.target.value)}
                  className="input input-bordered input-sm"
                  style={{ pointerEvents: "auto" }}
                />
                <div className="flex space-x-2 z-10">
                  <button
                    onClick={() => handleSaveClick(currClass.id)}
                    className="btn text-white btn-success"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-9 h-9"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="btn text-white btn-error"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-9 w-9"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <span>{currClass.name}</span>
                {openClassId === currClass.id && (
                  <div className="flex space-x-2 relative z-10">
                    <ModuleModal currClass={currClass} />
                    <button
                      onClick={() =>
                        handleEditClick(
                          currClass.id,
                          currClass.name,
                          currClass.startDate,
                          currClass.gradDate,
                          currClass.precourseStartDate
                        )
                      }
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-4.036a2.5 2.5 0 113.536 3.536l-12 12a2 2 0 01-.878.487l-4 1a1 1 0 01-1.213-1.213l1-4a2 2 0 01.487-.878l12-12z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(currClass.id)}
                      className="btn btn-error"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {openClassId === currClass.id && (
            <div className="collapse-content p-0">
              <div className="p-4">
                <p><strong>Precourse Start Date:</strong> {new Date(currClass.precourseStartDate).toDateString()}</p>
                <p><strong>Start Date:</strong> {new Date(currClass.startDate).toDateString()}</p>
                <p><strong>Graduation Date:</strong> {new Date(currClass.gradDate).toDateString()}</p>
              </div>
              {isLoadingModules ? (
                <div>Loading modules...</div>
              ) : (
                <ModuleCollapse allModules={modules} />
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
