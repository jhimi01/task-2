import useCookie from "@/hooks/useCookie";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { getCookie } = useCookie();
  const token = getCookie("accessToken");

  // If no token is found, redirect to login
  if (!token || token == undefined) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If token exists, allow access to the page
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!login|signup).*)"], // Applies to all pages except login and signup
};
