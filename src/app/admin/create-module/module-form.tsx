"use client"

import { postModule } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ModuleForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await postModule(title, intro);

    if (res) {
      router.push(`/module/${res.id}`);
    } else {
      console.error('Failed to create module');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
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
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
        Create Module
      </button>
    </form>
  );
}
