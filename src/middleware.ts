import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin/:path*"]);

export default clerkMiddleware(async (auth, request) => {
  const { nextUrl } = request;
  const baseUrl = nextUrl.origin;

  if (isAdminRoute(request)) {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      return NextResponse.redirect(new URL("/", baseUrl));
    }

    const userRole = sessionClaims?.role.role;

    if (userRole !== "admin") {
      return new NextResponse(
        JSON.stringify({
          error: "Unauthorized: You do not have access to this page.",
        }),
        { status: 403, headers: { "content-type": "application/json" } }
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/admin/:path*",
    "/api/:path*",
  ],
};
