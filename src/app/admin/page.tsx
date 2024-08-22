"use server";

import { auth } from "@clerk/nextjs/server";
import StudentCard from "../_components/studentcard";
import { getAllStudentInfo, SelectStudent } from "@/db/query";

export default async function AdminPage() {
  const { userId, sessionClaims } = auth(); // Get the user's session and claims from Clerk

  // Access the custom role from the claims
  const userRole = sessionClaims?.role.role; // This is the role we added to the JWT

  // Check if the user has the "admin" role
  if (userRole !== "admin") {
    return <h1>Unauthorized: You do not have access to this page.</h1>;
  }

  // Fetch student information if the user is an admin
  const allStudentInfo: SelectStudent[] = await getAllStudentInfo();

  return (
    <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-4 p-4 justify-items-center">
      <h1>Admin Dashboard</h1>
      {allStudentInfo.map((student) => (
        <StudentCard key={student.userId} student={student} />
      ))}
    </div>
  );
}
