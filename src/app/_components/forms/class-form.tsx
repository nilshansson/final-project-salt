"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InsertClasses, createClass } from "@/db/queries/class-queries";
import "daisyui/dist/full.css";
import { revalidatePath } from "next/cache";
import { postClassAndRevalidate } from "@/actions/actions";


export function ClassForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [precourseStartDate, setPrecourseStartDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [gradDate, setGradDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!precourseStartDate || !startDate || !gradDate) {
      setError("Please select precourse start date, start date, and graduation date.");
      setLoading(false);
      return;
    }

    try {
      const newClass: InsertClasses = {name, startDate, gradDate, precourseStartDate}


      const res = await postClassAndRevalidate(newClass);
      
      if (res) {
        setSuccess("Class created successfully!");
        setName("");
        setPrecourseStartDate(null);
        setStartDate(null);
        setGradDate(null);
      } else {
        setError("Failed to create class.");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
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
          value={
            precourseStartDate ? precourseStartDate.toISOString().split("T")[0] : ""
          }
          onChange={(e) =>
            setPrecourseStartDate(e.target.value ? new Date(e.target.value) : null)
          }
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

      {loading && <p className="text-blue-500">Creating class...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <button
        type="submit"
        className="bg-saltOrange text-white py-2 px-4 rounded mt-4 font-bold"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Class"}
      </button>
    </form>
  );
}
