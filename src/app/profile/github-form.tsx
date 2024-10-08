"use client";

import { handleAddGithubToDB } from "@/actions/actions";
import { SelectStudent } from "@/db/query";
import { useState } from "react";

interface GHFormProps {
  student: SelectStudent;
}

export function GithubForm({ student }: GHFormProps) {
  const [githubSaltiename, setGithubSaltiename] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (githubSaltiename && student.saltieId) {
      handleAddGithubToDB(student.saltieId, githubSaltiename);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="join">
      <input
        className="input input-bordered join-item"
        placeholder="GitHub Saltiename"
        value={githubSaltiename}
        onChange={(e) => setGithubSaltiename(e.target.value)}
      />
      <button type="submit" className="btn join-item rounded-r-full">
        Add
      </button>
    </form>
  );
}
