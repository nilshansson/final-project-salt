"use client";

import { postLink, revalidatePathCreateModule } from "@/actions/actions";
import { useState } from "react";

interface LinkProps {
  moduleId: number;
}

export default function LinkPoster({ moduleId }: LinkProps) {
  const [url, setUrl] = useState("");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    postLink(moduleId, url).then(() => alert("LINK IS NOW LINKED"));
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="card flex flex-col items-center p-4"
    >
      <label className="font-semibold mb-2">Add a Link:</label>

      <div className="flex flex-col sm:flex-row items-center w-full gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 w-full sm:w-auto"
          placeholder="Enter your URL"
        />
        <button
          type="submit"
          className="bg-saltOrange text-white px-4 py-2 rounded mt-2 sm:mt-0"
        >
          Post link
        </button>
      </div>
    </form>
  );
}
