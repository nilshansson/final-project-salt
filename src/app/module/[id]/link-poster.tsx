import { postLink } from "@/actions/actions";
import { ErrorToast, SuccessToast } from "@/app/_components";
import { combinedLink } from "@/db/query";
import { useState } from "react";

interface LinkProps {
  moduleId: number;
  onLinkAdded: (newLink: combinedLink) => void; // Add this prop
}

export default function LinkPoster({ moduleId, onLinkAdded }: LinkProps) {
  const [url, setUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function formatUrl(inputUrl: string): string {
    let formattedUrl = inputUrl.trim();
    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      formattedUrl = `http://${formattedUrl}`;
    }
    return formattedUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formattedUrl = formatUrl(url);

    setLoading(true);

    try {
      const postedLink = await postLink(moduleId, formattedUrl);
      setSuccessMessage("Link has been posted successfully!");
      setErrorMessage(null);
      setUrl("");
      setTimeout(() => setSuccessMessage(null), 5000);

  const newLink: combinedLink = {
    ...postedLink,
    isUploadThing: true,
    id: postedLink.id!,
    description: postedLink.description ?? null,
    createdAt : postedLink.createdAt!,
    updatedAt : postedLink.updatedAt!
  };
      onLinkAdded(newLink); // This should now work fine
    } catch (error) {
      setErrorMessage("Failed to post the link. Please try again.");
      setSuccessMessage(null);
      console.error("Failed to post the link:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card flex flex-col items-center p-4"
    >
      {successMessage && <SuccessToast successMessage={successMessage} />}
      {errorMessage && <ErrorToast errorMessage={errorMessage} />}

      <label className="font-semibold mb-2">Add a Link:</label>

      <div className="flex flex-col sm:flex-row items-center w-full gap-2 justify-center">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="border border-gray-300 rounded-xl p-2 w-full sm:w-auto"
          placeholder="Enter your URL"
        />
        <button
          type="submit"
          className={`bg-saltOrange text-white px-4 py-2 rounded-3xl mt-2 sm:mt-0 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a1 1 0 00-.707 1.707L10.586 13l-7.293 7.293A1 1 0 004 22h16a1 1 0 00.707-1.707L13.414 13l7.293-7.293A1 1 0 0018 6H4z"
                />
              </svg>
              Loading...
            </span>
          ) : (
            "Post link"
          )}
        </button>
      </div>
    </form>
  );
}
