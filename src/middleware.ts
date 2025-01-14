import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLoggedInUser } from "@/repositories/authRepo";

const protectedRoutes = ["/dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedRoute = protectedRoutes.includes(pathname);

  if (isProtectedRoute) {
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.redirect(new URL("/sign-up", req.nextUrl));
    }
    // else if (!req.nextUrl.pathname.includes("/dashboard")) {
    //   return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
  // matcher: ["/((?!api|[slug]|_next/static|_next/image|.*\\.png$).*)"],
};
