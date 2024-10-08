import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin/:path*"]);

export default clerkMiddleware(async (auth, request) => {
  const { nextUrl } = request;
  const baseUrl = nextUrl.origin;

  if (isAdminRoute(request)) {
    const { saltieId, sessionClaims } = await auth();

    if (!saltieId) {
      return NextResponse.redirect(new URL("/", baseUrl));
    }

    // Assert the expected structure of sessionClaims
    const saltieRole = (sessionClaims as { role?: { role: string } })?.role?.role;

    if (saltieRole !== "admin") {
      return new NextResponse(
        JSON.stringify({
          error: "Unauthorized: You do not have access to this page.",
        }),
        { status: 403, headers: { "content-type": "application/json" } },
      );
    }
  }

  return NextResponse.next();
});
