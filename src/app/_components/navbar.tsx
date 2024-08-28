"use server";
import {
  selectAllClasses,
  selectAllCourseModulesByClassId,
  SelectClasses,
  SelectModule,
} from "@/db/query";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

interface ClassWithModules {
  class: SelectClasses;
  modules: SelectModule[];
}

function getRoleFromSessionClaims(sessionClaims: any): string | undefined {
  return sessionClaims?.role?.role;
}

export async function Navbar() {
  const allClasses = await selectAllClasses();
  const { sessionClaims } = auth();

  const userRole = getRoleFromSessionClaims(sessionClaims);
  const isAdmin = userRole === "admin";

  const allClassesWithModules: ClassWithModules[] = await Promise.all(
    allClasses.map(async (currClass) => {
      const modules = await selectAllCourseModulesByClassId(currClass.id);
      return { class: currClass, modules };
    })
  );

  return (
    <div className="navbar relative z-50 bg-base-100">
      <div className="navbar-start">
        <SignedIn>
          {/* Drawer Trigger Button */}
          <label
            htmlFor="my-drawer"
            className="btn btn-ghost btn-circle drawer-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </label>
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
          {isAdmin ? (
            <>
              <div className="relative group">
                {/* Dropdown Trigger */}
                <div className="flex items-center px-2 py-1 space-x-2 cursor-pointer">
                  <Link className="flex items-center space-x-2" href={`/admin`}>
                    <svg
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 479.79 479.79"
                      stroke="currentColor"
                      width="25"
                      height="25"
                      className="stroke-saltDarkBlue group-hover:stroke-saltOrange transition-colors duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="20"
                        d="M478.409,116.617c-0.368-4.271-3.181-7.94-7.2-9.403c-4.029-1.472-8.539-0.47-11.57,2.556l-62.015,62.011l-68.749-21.768 l-21.768-68.748l62.016-62.016c3.035-3.032,4.025-7.543,2.563-11.565c-1.477-4.03-5.137-6.837-9.417-7.207 c-37.663-3.245-74.566,10.202-101.247,36.887c-36.542,36.545-46.219,89.911-29.083,135.399c-1.873,1.578-3.721,3.25-5.544,5.053 L19.386,373.152c-0.073,0.071-0.145,0.149-0.224,0.219c-24.345,24.346-24.345,63.959,0,88.309 c24.349,24.344,63.672,24.048,88.013-0.298c0.105-0.098,0.201-0.196,0.297-0.305l193.632-208.621 c1.765-1.773,3.404-3.628,4.949-5.532c45.5,17.167,98.9,7.513,135.474-29.056C468.202,191.181,481.658,154.275,478.409,116.617z M75.98,435.38c-8.971,8.969-23.5,8.963-32.47,0c-8.967-8.961-8.967-23.502,0-32.466c8.97-8.963,23.499-8.963,32.47,0 C84.947,411.878,84.947,426.419,75.98,435.38z"
                      />
                    </svg>
                    {/* Admin Dashboard Text */}
                    <span className="text-saltDarkBlue group-hover:text-saltOrange transition-colors duration-300 hidden md:inline">
                      Admin Dashboard
                    </span>
                  </Link>
                  {/* Dropdown Arrow */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-saltDarkBlue group-hover:text-saltOrange transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 pt-2 hidden group-hover:block hover:block md:left-0 md:transform-none">
                  <div className="w-48 bg-white shadow-lg border border-gray-200">
                    <ul>
                      <li>
                        <Link
                          href={`/admin/classes`}
                          className="block px-4 py-2 text-black hover:bg-saltDarkBlue hover:text-white transition-colors duration-300"
                        >
                          Class editor
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/admin/modules`}
                          className="block px-4 py-2 text-black hover:bg-saltDarkBlue hover:text-white transition-colors duration-300"
                        >
                          Module editor
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <UserButton />
            </>
          ) : (
            <div className="flex flex-row justify-center items-center text-center space-x-2">
              <Link href={`/profile`} className="text-center flex items-center">
                <span className="px-2 hover:text-saltDarkPink">Profile</span>
                <UserButton />
              </Link>
            </div>
          )}
        </SignedIn>

        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>

      {/* Drawer Component */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          className="drawer-overlay"
          aria-label="close sidebar"
        ></label>
        <ul className="menu bg-base-200 text-saltDarkBlue transition-colors duration-300 min-h-full w-80 p-4">
          {allClassesWithModules.map(({ class: currClass, modules }) => (
            <li key={currClass.id}>
              <details>
                <summary className="font-bold hover:text-saltOrange prose-2xl">
                  <Link href={`/class/${currClass.id}`}>{currClass.name}</Link>
                </summary>
                <ul className="ml-4">
                  {modules.map((module: SelectModule) => (
                    <li
                      key={module.id}
                      className="prose-sm hover:text-saltOrange "
                    >
                      <Link href={`/module/${module.id}`}>{module.title}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
