"use client";

import { useState } from "react";
import { combinedLink } from "@/db/query";
import Link from "next/link";
import {
  deleteLinkRevalidate,
  deleteUTLinkRevalidate,
  updateLinkDetailsRevalidate,
  updateUTLinkDetailsRevalidate,
} from "@/actions/actions";
import { LinkModal } from "@/app/_components";

interface LinkBoxProps {
  moduleId: number;
  links: combinedLink[];
}

export function LinkBoxes({ moduleId, links: initialLinks }: LinkBoxProps) {
  const [links, setLinks] = useState<combinedLink[]>(initialLinks);
  const [editingLinkId, setEditingLinkId] = useState<number | null>(null);
  const [updatedLinkTitle, setUpdatedLinkTitle] = useState<string>("");
  const [updatedLinkUrl, setUpdatedLinkUrl] = useState<string>("");

  const handleEditClick = (link: combinedLink) => {
    setEditingLinkId(link.id);
    setUpdatedLinkTitle(link.title);
    setUpdatedLinkUrl(link.url);
  };

  const handleSaveClick = async (link: combinedLink) => {
    if (link.isUploadThing) {
      await updateUTLinkDetailsRevalidate(link.id, updatedLinkTitle, updatedLinkUrl);
    } else {
      await updateLinkDetailsRevalidate(link.id, updatedLinkTitle, updatedLinkUrl);
    }

    // Update the UI
    setLinks((prevLinks) =>
      prevLinks.map((l) =>
        l.id === link.id ? { ...l, title: updatedLinkTitle, url: updatedLinkUrl } : l
      )
    );
    setEditingLinkId(null);
  };

  const handleCancelClick = () => {
    setEditingLinkId(null);
    setUpdatedLinkTitle("");
    setUpdatedLinkUrl("");
  };

  const handleDeleteClick = async (link: combinedLink) => {
    if (link.isUploadThing) {
      await deleteUTLinkRevalidate(link.id);
    } else {
      await deleteLinkRevalidate(link.id);
    }

    // Update the UI to remove the deleted link
    setLinks((prevLinks) => prevLinks.filter((l) => l.id !== link.id));
  };

  // New method to add a link to the list
  const addNewLink = (newLink: combinedLink) => {
    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  return (
    <>
      <div>
        <LinkModal moduleId={moduleId} addNewLink={addNewLink} />
      </div>
      {links.map((link) => (
        <div
          key={`${moduleId}-${link.id}`} // Combine moduleId and link.id for uniqueness
          className="card bg-base-300 p-2 my-1 flex justify-between items-center"
        >
          {editingLinkId === link.id ? (
            <div className="flex flex-col space-y-2 w-full">
              <input
                type="text"
                value={updatedLinkTitle}
                onChange={(e) => setUpdatedLinkTitle(e.target.value)}
                className="input input-bordered input-sm"
              />
              <input
                type="text"
                value={updatedLinkUrl}
                onChange={(e) => setUpdatedLinkUrl(e.target.value)}
                className="input input-bordered input-sm"
              />
              <div className="flex space-x-2 z-10">
                <button
                  onClick={() => handleSaveClick(link)}
                  className="btn text-white btn-success"
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
              <div className="flex flex-col">
                <Link href={link.url} className="font-bold text-lg">
                  {link.title}
                </Link>
                <div
                  className="text-sm text-gray-500"
                  style={{ lineHeight: "normal", padding: 0 }}
                >
                  <p className="my-0" style={{ marginBottom: 0, marginTop: 0 }}>
                    Created at:{" "}
                    {new Date(link.createdAt).toLocaleString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {link.updatedAt && (
                    <p
                      className="my-0"
                      style={{ marginBottom: 0, marginTop: 0 }}
                    >
                      Updated at:{" "}
                      {new Date(link.updatedAt).toLocaleString("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex space-x-2 z-10">
                <button
                  onClick={() => handleEditClick(link)}
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
                <button
                  onClick={() => handleDeleteClick(link)}
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
            </div>
          )}
        </div>
      ))}
    </>
  );
}
