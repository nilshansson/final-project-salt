"use client";
import Image from "next/image";
import { SignedOut, SignedIn, useUser } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {PreloggedInHero} from "./_components";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/profile");
    }
  }, [isLoaded, isSignedIn, router]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <SignedOut>
        <PreloggedInHero />
      </SignedOut>
    </main>
  );
}
