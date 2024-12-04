import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken");
  const loggedInRestrictedPaths = ["/login", "/signup"];
  
  // If no token is found, redirect to login unless the path is login or signup
  if (!token) {
    if (!loggedInRestrictedPaths.includes(req.nextUrl.pathname)) {
      console.log("No token found. Redirecting to /login.");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else {
    // If a token is found, prevent access to login/signup pages
    if (loggedInRestrictedPaths.includes(req.nextUrl.pathname)) {
      console.log("Token found but on restricted page. Redirecting to /.");
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next|favicon.ico).*)" // Applies to all paths except API routes, _next, and favicon.ico
  ]
};
