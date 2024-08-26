"use client";

import ErrorToast from "@/app/_components/errortoast";
import Loading from "@/app/_components/loading";
import React, { useState } from "react";
import { updateClassOnStudentorStudents } from "@/db/query";
import SuccessToast from "@/app/_components/successtoast";
import { EditClassesFormProps, Student } from "@/app/types/index";

export default function EditClassesForm({
  allStudents: initialStudents,
  allClasses,
}: EditClassesFormProps) {
  const [allStudents, setAllStudents] = useState<Student[]>(initialStudents);
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

      const updatedStudents = allStudents.map((student) =>
        selectedStudentsId.includes(student.id)
          ? { ...student, classId }
          : student
      );
      setAllStudents(updatedStudents);

      setSelectedStudentsId([]);

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
    <form className="flex items-center justify-center h-screen mt-4">
      <div className="flex flex-col lg:flex-row gap-8 w-full px-8">
        <div className="card bg-saltGreenPastell w-full lg:w-1/2 shadow-xl">
          <div className="card-body flex flex-col items-start justify-start text-center">
            <h1 className="text-4xl font-bold mb-4 pb-11">Students</h1>

            <div className="w-full mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-saltDarkBlue">
                Students Without a Class
              </h2>
              {allStudents
                .filter((student) => student.classId === null)
                .map((student) => (
                  <div className="form-control justify-end" key={student.id}>
                    <label className="label cursor-pointer">
                      <span className="label-text mr-3">{student.name}</span>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        name={`student-${student.id}`}
                        checked={
                          selectedStudentsId.includes(student.id) || false
                        }
                        onChange={() => handleCheckboxChange(student.id)}
                      />
                    </label>
                  </div>
                ))}
              {allStudents.filter((student) => student.classId === null)
                .length === 0 && (
                <p>All students have been assigned to a class.</p>
              )}
            </div>

            {allClasses.map((classItem) => (
              <div key={classItem.id} className="w-full mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-saltDarkBlue">
                  {classItem.name}
                </h2>
                {allStudents
                  .filter((student) => student.classId === classItem.id)
                  .map((student) => (
                    <div className="form-control justify-end" key={student.id}>
                      <label className="label cursor-pointer">
                        <span className="label-text mr-3">{student.name}</span>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          name={`student-${student.id}`}
                          checked={
                            selectedStudentsId.includes(student.id) || false
                          }
                          onChange={() => handleCheckboxChange(student.id)}
                        />
                      </label>
                    </div>
                  ))}
                {allStudents.filter(
                  (student) => student.classId === classItem.id
                ).length === 0 && <p>No students in this class.</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="card bg-saltBluePastell w-full lg:w-1/2 shadow-xl">
          <div className="card-body flex flex-col items-start justify-start text-center">
            <h1 className="text-4xl font-bold mb-4 pb-11">Classes Overview</h1>

            {error && <ErrorToast errorMessage={error} />}
            {success && <SuccessToast successMessage={success} />}

            {allClasses.map((classItem) => {
              return (
                <div
                  key={classItem.id}
                  className="mb-4 flex flex-row items-center w-full"
                >
                  <h1 className="text-saltDarkBlue text-3xl text-center">
                    {classItem.name}
                  </h1>

                  <div className="ml-auto">
                    <button
                      type="button"
                      className="btn bg-saltOrange mt-4 text-white"
                      onClick={(event) =>
                        handleClassSubmit(event, classItem.id)
                      }
                      disabled={loading}
                    >
                      {loading ? <Loading /> : "Add students to class"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
}
