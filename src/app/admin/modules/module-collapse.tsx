"use client";

import { useState, useEffect } from "react";
import { combinedLink, SelectModule, selectAllLinksByModule } from "@/db/query";
import { LinkBoxes } from "./link-boxes";
import {
  deleteModuleAndRevalidate,
  updateModuleDetailsAndRevalidate,
} from "@/actions/actions";
import { LinkModal, Loading } from "@/app/_components";

interface moduleWithLinks {
  module: SelectModule;
  links: combinedLink[];
}

interface ModuleCollapseProps {
  allModules: SelectModule[];
}

export default function ModuleCollapse({
  allModules,
}: ModuleCollapseProps) {
  const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
  const [updatedModuleTitle, setUpdatedModuleTitle] = useState<string>("");
  const [updatedModuleIntro, setUpdatedModuleIntro] = useState<string>("");
  const [openModuleId, setOpenModuleId] = useState<number | null>(null);
  const [links, setLinks] = useState<combinedLink[]>([]);
  const [isLoadingLinks, setIsLoadingLinks] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleEditClick = (
    moduleId: number,
    currentTitle: string,
    currentIntro: string | null
  ) => {
    setEditingModuleId(moduleId);
    setUpdatedModuleTitle(currentTitle);
    setUpdatedModuleIntro(currentIntro || "");
  };

  const handleSaveClick = async (moduleId: number) => {
    setIsLoadingLinks(true);
    setError(null);
    setSuccess(null);

    try {
      await updateModuleDetailsAndRevalidate(
        moduleId,
        updatedModuleTitle,
        updatedModuleIntro
      );
      setSuccess("Module updated successfully!");
      setEditingModuleId(null);
    } catch {
      setError("Failed to update module. Please try again.");
    } finally {
      setIsLoadingLinks(false);
    }
  };

  const handleCancelClick = () => {
    setEditingModuleId(null);
    setUpdatedModuleTitle("");
    setUpdatedModuleIntro("");
  };

  const handleDeleteClick = async (moduleId: number) => {
    setIsLoadingLinks(true);
    setError(null);
    setSuccess(null);

    try {
      await deleteModuleAndRevalidate(moduleId);
      setSuccess("Module deleted successfully!");
    } catch {
      setError("Failed to delete module. Please try again.");
    } finally {
      setIsLoadingLinks(false);
    }
  };

  const toggleCollapse = async (moduleId: number) => {
    if (openModuleId === moduleId) {
      setOpenModuleId(null);
      setLinks([]);
    } else {
      setOpenModuleId(moduleId);
      setIsLoadingLinks(true);

      // Fetch links for the selected module
      const fetchedLinks = await selectAllLinksByModule(moduleId);
      setLinks(fetchedLinks);
      setIsLoadingLinks(false);
    }
  };

  return (
    <div className="collapse-content">
      {allModules.map((module) => (
        <div key={"module" + module.id} className="collapse bg-base-200 my-1">
          <input
            type="checkbox"
            checked={openModuleId === module.id}
            onChange={() => toggleCollapse(module.id)}
          />
          <div className="collapse-title text-xl font-semibold flex justify-between items-center">
            {editingModuleId === module.id ? (
              <div className="flex flex-col space-y-2 w-full">
                <input
                  type="text"
                  value={updatedModuleTitle}
                  onChange={(e) => setUpdatedModuleTitle(e.target.value)}
                  className="input input-bordered input-lg"
                />
                <textarea
                  value={updatedModuleIntro}
                  onChange={(e) => setUpdatedModuleIntro(e.target.value)}
                  className="textarea textarea-bordered"
                  rows={3}
                />
                <div className="flex space-x-2 z-10">
                  <button
                    onClick={() => handleSaveClick(module.id)}
                    className="btn text-white btn-success"
                    disabled={isLoadingLinks}
                  >
                    {isLoadingLinks ? (
                      <Loading />
                    ) : (
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                  {error && <p>{error}</p>}

                  <button
                    onClick={handleCancelClick}
                    className="btn text-white btn-error"
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
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <span>{module.title}</span>
            {openModuleId === module.id && (
              <div className="flex space-x-2 z-10">
                    <button
                      onClick={() =>
                        handleEditClick(
                          module.id,
                          module.title,
                          module.intro
                        )
                      }
                      className="btn btn-warning"
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
                    {isLoadingLinks ? (
                      <Loading />
                    ) : (
                      <button
                        onClick={() => handleDeleteClick(module.id)}
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
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="collapse-content">
            {editingModuleId !== module.id && (
              <>
                <p>{module.intro}</p>
                {isLoadingLinks ? (
                  <div>Loading links...</div>
                ) : (
                  <LinkBoxes moduleId={module.id} links={links} />
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );

}
