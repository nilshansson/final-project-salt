"use client";
import Image from "next/image";
import { SignedOut, SignedIn, useUser } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/profile");
    }
  }, [isLoaded, isSignedIn, router]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedOut>
        <h1>please sign in above</h1>
      </SignedOut>
    </main>
  );
}
