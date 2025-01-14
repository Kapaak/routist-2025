import { JWT } from "next-auth/jwt";
import withAuth from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export interface NextRequestWithAuth extends NextRequest {
  nextauth: { token: JWT | null };
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|logo.png).*)",
  ],
};

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent
) {
  const protectedRoutes = ["/locations"];
  const currentPath = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    return withAuth(req, event);
  }
  return NextResponse.next();
}

// --- KEEP FOR REFERENCE ---
//Possible other solution, that will make the middleware to run on page === /locations
//It checks if the user is authenticated and if not, it will redirect to the login page

//But in future it might be wanted to do more things in the middleware,
// and this code just makes middleware to work on the /locations page (or other pages that are in matcher)

// export default withAuth((req) => {
// // ... some code
// });

// export const config = {
//   matcher: ["/locations"],
// };
