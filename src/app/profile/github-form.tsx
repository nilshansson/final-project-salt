"use client"

import { SelectStudent, SelectUser } from "@/db/query";
import { useState } from "react";

interface GHFormProps{
  student:SelectStudent
  user:SelectUser
}

export function GithubForm({student, user}:GHFormProps){
const [githubUsername, setGithubUsername] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (githubUsername && userId) {
      handleAddGithubToDB(userId, githubUsername);
    }
  };

  return (
            <form onSubmit={handleSubmit} className="join">
              <input
                className="input input-bordered join-item"
                placeholder="GitHub Username"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
              />
              <button type="submit" className="btn join-item rounded-r-full">
                Add
              </button>
            </form>

  )
}
