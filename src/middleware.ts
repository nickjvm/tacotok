import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the request is for an admin API route
  if (request.nextUrl.pathname.startsWith("/api/admin")) {
    const token = request.headers.get("x-admin-token");

    // Check if the token is valid
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  // Continue with the request if the token is valid or if it's not an admin route
  return NextResponse.next();
}

// Apply the middleware to all API routes under /api/admin
export const config = {
  matcher: "/api/admin/:path*",
};
