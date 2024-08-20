"use client"

import { postLink, revalidatePathCreateModule } from "@/actions/actions";
import { useState } from "react";

interface LinkProps{
  moduleId:number
}

export default function LinkPoster({moduleId}:LinkProps){
  const [url, setUrl] = useState('');
  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();

    postLink(moduleId, url)

  };
  return(
  <form onSubmit={handleSubmit} className="card flex flex-row">
      <div className="flex flex-row">
        <label className="font-semibold">Link:</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="border border-gray-300 rounded p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 rounded">
        Post link
      </button>
      </form>



) }
