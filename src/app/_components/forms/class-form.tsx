"use client";

import { useState } from "react";
import { postClassAndRevalidate } from "@/actions/actions";
import { useRouter } from "next/navigation";
import "daisyui/dist/full.css";

export function ClassForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [precourseStartDate, setPrecourseStartDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [gradDate, setGradDate] = useState<Date | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!precourseStartDate || !startDate || !gradDate) {
      console.error("Please select precourse start date, start date and graduation date");
      return;
    }

    const res = await postClassAndRevalidate(name, startDate, gradDate);

    if (res) {
      console.log("Class created successfully");
    } else {
      console.error("Failed to create class");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <h3>Create New Class</h3>
        <label className="font-semibold">Class Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded p-2"
        />
      </div>



      <div className="flex flex-col space-y-2">
        <label className="font-semibold">Precourse Start Date:</label>
        <input
          type="date"
          className="input input-bordered w-full max-w-xs"
          value={precourseStartDate ? precourseStartDate.toISOString().split("T")[0] : ""}
          onChange={(e) => setPrecourseStartDate(e.target.value ? new Date(e.target.value) : null)}
          required
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-semibold">Start Date:</label>
        <input
          type="date"
          className="input input-bordered w-full max-w-xs"
          value={startDate ? startDate.toISOString().split("T")[0] : ""}
          onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
          required
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-semibold">Graduation Date:</label>
        <input
          type="date"
          className="input input-bordered w-full max-w-xs"
          value={gradDate ? gradDate.toISOString().split("T")[0] : ""}
          onChange={(e) => setGradDate(e.target.value ? new Date(e.target.value) : null)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Create Class
      </button>
    </form>
  );
}
