"use client"
import { SignedOut, SignInButton } from "@clerk/nextjs";

export function PreloggedInHero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1615525137689-198778541af6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white">
            Welcome to the SALT precourse!
          </h1>
          <p className="mb-5">
            We&apos;re excited for you to start the bootcamp soon. Before diving in,
            please complete this pre-course to set yourself up for success.
          </p>
          <SignedOut>
            <SignInButton>
              <button className="bg-saltOrange text-white p-5 rounded-3xl font-semibold">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
