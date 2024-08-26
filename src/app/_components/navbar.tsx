import { selectAllClasses, selectAllCourseModules, selectAllCourseModulesByClassId, SelectClasses, SelectModule } from "@/db/query";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignIn,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
interface ClassWithModules {
  class: SelectClasses;
  modules: SelectModule[];
}

function getRoleFromSessionClaims(sessionClaims: any): string | undefined {
  return sessionClaims?.role?.role;
}

export async function Navbar() {
  const allClasses = await selectAllClasses();
  const { sessionClaims } = auth()

  console.log("CLERKAUTH \n\n\n\n")
  console.log(sessionClaims)

  const userRole = getRoleFromSessionClaims(sessionClaims);
  const isAdmin = userRole === "admin";
  console.log(isAdmin)

  const allClassesWithModules: ClassWithModules[] = await Promise.all(
    allClasses.map(async (currClass) => {
      const modules = await selectAllCourseModulesByClassId(currClass.id);
      return { class: currClass, modules };
    })
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <SignedIn>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {allClassesWithModules.map(({class:currClass, modules}) => (
                <>
                <li key={currClass.id}>
                <Link className="font-bold" href={`/class/${currClass.id}`}>{currClass.name}</Link>
                </li>
                {modules.map((module:SelectModule)=>(
                <li key={module.id}>
                  <Link href={`/module/${module.id}`}>{module.title}</Link>
                </li>
                ))}

                </>
              ))}
            </ul>
          </div>
        </SignedIn>
      </div>

      <div className="navbar-center"></div>
      <Link href="/profile">
        <Image
          src="https://salt.dev/new-site/wp-content/uploads/2024/02/salt-logo-dark.svg"
          width={80}
          height={80}
          alt="</salt>"
        />
      </Link>

      <div className="navbar-end">
        <SignedIn>
          {isAdmin && (
            <button className="btn btn-primary ml-4">
              Admin Dashboard
            </button>
          )}
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
}
