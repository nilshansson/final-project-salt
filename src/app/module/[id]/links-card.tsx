"use client";

import { postUtlink, revalidatePathCreateModule } from "@/actions/actions";
import { combinedLink, selectAllLinksByModule } from "@/db/queries/link-queries";
import { UploadButton } from "@/utils/uploadthing";
import Link from "next/link";
import LinkPoster from "./link-poster";
import { useState, useEffect } from "react";

export interface LinksProps {
  moduleId: number;
}

export function LinksCard({ moduleId }: LinksProps) {
  const [links, setLinks] = useState<combinedLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const fetchedLinks = await selectAllLinksByModule(moduleId);
        setLinks(fetchedLinks);
      } catch (error) {
        setErrorMessage("Failed to load links.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, [moduleId]);

  const addNewLink = (newLink: combinedLink) => {
    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  const handleLinkUpload = async (name: string, url: string) => {
    try {
      await postUtlink(moduleId, name, url);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      revalidatePathCreateModule();
      // Re-fetch links after uploading a new one
      const updatedLinks = await selectAllLinksByModule(moduleId);
      setLinks(updatedLinks);
    } catch (error) {
      setErrorMessage("Failed to upload link.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  if (isLoading) {
    return <div>Loading links...</div>;
  }



  return (
    <>
      <div className="card bg-saltLightPink flex-col p-4">
        <h2 className="text-center text-xl font-semibold text-saltDarkBlue">
          Links
        </h2>
        <div className="card bg-base-200 p-4 mt-4">
          {links.length > 0 ? (
            links.map((link) => (
              <div key={link.id}>
                <Link href={link.url}>
                  <div className="card bg-base-300 m-2">
                    <h3 className="text-center text-lg px-3 text-saltDarkPink">
                      {link.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No links available.</p>
          )}
        </div>
        <LinkPoster moduleId={moduleId} onLinkAdded={addNewLink} />
        {success && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Upload Complete</span>
            </div>
          </div>
        )}
        {errorMessage && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{`ERROR! ${errorMessage}`}</span>
          </div>
        )}

        <div className="w-full flex flex-col justify-center my-4">
          <p className="text-center font-semibold text-saltDarkPink py-1">
            Or upload a file:
          </p>
          <UploadButton
            endpoint="fileUploader"
            appearance={{
              button: {
                background: "#0F2D45",
                color: "white",
                borderRadius: "20px",
              },
            }}
            onClientUploadComplete={(res) => {
              handleLinkUpload(res[0].name, res[0].url);
            }}
            onUploadError={(error: Error) => {
              setErrorMessage(`ERROR! ${error.message}`);
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            }}
          />
        </div>
      </div>
    </>
  );
}
