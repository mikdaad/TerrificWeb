import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const visited = req.cookies.get("visited");

  if (!visited) {
    // Set the cookie for 30 days
    const res = NextResponse.redirect(new URL("/getstarted", req.url));
    res.cookies.set("visited", "true", { maxAge: 60 * 60 * 24 * 30 }); // 30 days

    return res;
  }

  return NextResponse.next(); // Continue to the requested page
}

// Apply middleware only to the homepage (`/`)
export const config = {
  matcher: "/",
};
