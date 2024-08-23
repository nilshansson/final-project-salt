"use client";

import ErrorToast from "@/app/_components/errortoast";
import Loading from "@/app/_components/loading";
import React, { useState } from "react";
import { updateClassOnStudentorStudents } from "@/db/query";
import SuccessToast from "@/app/_components/successtoast";

type Student = {
  id: number;
  name: string;
  userId: string | null;
  classId: number | null;
  github: string | null;
};

type ClassType = {
  id: number;
  name: string;
};

interface EditClassesFormProps {
  allStudents: Student[];
  allClasses: ClassType[];
}

export default function EditClassesForm({
  allStudents,
  allClasses,
}: EditClassesFormProps) {
  const [selectedStudentsId, setSelectedStudentsId] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCheckboxChange = (studentId: number) => {
    setSelectedStudentsId((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((id) => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const handleClassSubmit = async (event: React.FormEvent, classId: number) => {
    event.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updateClassOnStudentorStudents(classId, selectedStudentsId);
      setSuccess("Students successfully added to the class!");

      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError("Failed to update students' class. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="flex items-center justify-center h-screen">
      <div className="flex flex-row gap-8">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body flex flex-col items-center justify-center text-center">
            <h1 className="text-lg font-bold mb-4">students</h1>

            {allStudents.map((student) => (
              <div className="form-control justify-end" key={student.id}>
                <label className="label cursor-pointer">
                  <span className="label-text mr-3">{student.name}</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    name={`student-${student.id}`}
                    checked={selectedStudentsId.includes(student.id) || false}
                    onChange={() => handleCheckboxChange(student.id)}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body flex flex-col items-center justify-center text-center">
            <h1 className="text-lg font-bold mb-4">classes overview</h1>

            {error && <ErrorToast errorMessage={error} />}
            {success && <SuccessToast successMessage={success} />}
            {allClasses.map((classItem) => {
              return (
                <div key={classItem.id} className="mb-4">
                  <h1>{classItem.name}</h1>

                  <button
                    type="button"
                    className="btn btn-primary mt-4"
                    onClick={(event) => handleClassSubmit(event, classItem.id)}
                    disabled={loading}
                  >
                    {loading ? <Loading /> : "Add students to class"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
}
