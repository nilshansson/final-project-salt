"use client";

import { postModuleAndRevalidate } from "@/actions/actions";
import { Loading } from "@/app/_components/loading";
import { SelectClasses, SelectModule } from "@/db/query";
import { useState } from "react";

interface ModuleProps {
  currClass: SelectClasses;
  onModuleCreated: (newModule:SelectModule) => void; // Callback function to notify module creation
}

export function ModuleForm({ currClass, onModuleCreated }: ModuleProps) {
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await postModuleAndRevalidate(title, intro, currClass.id);
      if (res) {
        console.log("res \n\n\n\n\n")
        console.log(res)
        setSuccess("Module successfully created!");
        setTitle("");
        setIntro("");
        onModuleCreated(res); // Notify the parent component
      } else {
        setError("Failed to create module.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <h3>Create module for {currClass.name}</h3>
        <label className="font-semibold">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 rounded p-2"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-semibold">Intro:</label>
        <textarea
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
      </div>

      {loading && <p className="text-blue-500">Creating module...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        disabled={loading}
      >
        {loading ? <Loading /> : "Create Module"}
      </button>
    </form>
  );
}
