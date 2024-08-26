"use client";

import { handleAddGithubToDB } from "@/actions/actions";
import { SelectStudent } from "@/db/query";
import { useState } from "react";

interface GHFormProps {
  student: SelectStudent;
}

export function GithubForm({ student }: GHFormProps) {
  const [githubUsername, setGithubUsername] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (githubUsername && student.userId) {
      handleAddGithubToDB(student.userId, githubUsername);
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
  );
}
