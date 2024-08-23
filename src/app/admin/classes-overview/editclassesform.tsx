"use client";

import { updateClassOnStudentorStudents } from "@/db/query";
import React, { useState } from "react";

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

    await updateClassOnStudentorStudents(classId, selectedStudentsId);
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
            {allClasses.map((classItem) => {
              return (
                <div key={classItem.id} className="mb-4">
                  <h1>{classItem.name}</h1>

                  <button
                    type="button"
                    className="btn btn-primary mt-4"
                    onClick={(event) => handleClassSubmit(event, classItem.id)}
                  >
                    Add to students to class
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
