import { NextRequest, NextResponse } from "next/server";
import { protectedRoutes, publicRoutes, routes } from "./lib/routes";

// Protected routes that require authentication
// Regular expression for dynamic routes
const protectedRegexRoutes = protectedRoutes.map(
  (route) => new RegExp(`^${route}(\/.*)?$`)
);

const publicRegexRoutes = publicRoutes.map(
  (route) => new RegExp(`^${route}(\/.*)?$`)
);

const middleware = (req: NextRequest) => {
  // const sessionStatus = req.cookies.get("token")?.value;
  // TODO: Replace the below line with actual session check logic
  // const sessionStatus = "fsdfhsdfjsdf";
  const sessionStatus = "";

  // Get the access token from cookies
  const requestedRoute = req.nextUrl.pathname;
  const isProtectedRoute =
    protectedRoutes.includes(requestedRoute) ||
    protectedRegexRoutes.some((regex) => regex.test(requestedRoute));

  const isPublicRoute =
    publicRoutes.includes(requestedRoute) ||
    publicRegexRoutes.some((regex) => regex.test(requestedRoute));
    
  // If the route is public return next
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // random route redirection to home
  if (
    // requestedRoute === "/" ||
    !isProtectedRoute &&
    !publicRoutes.includes(requestedRoute)
  ) {
    const absoluteURL = new URL(routes.home, req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Allow public routes without any checks
  // if (publicRoutes.includes(requestedRoute)) {
  //   if (sessionStatus && requestedRoute === routes.signIn) {
  //     const absoluteURL = new URL(routes.home, req.nextUrl.origin); // Redirect logged-in users away from login/signup
  //     return NextResponse.redirect(absoluteURL.toString());
  //   }
  //   return NextResponse.next(); // Continue to the requested public page
  // }

  // If there's no session and the route is protected
  if (!sessionStatus && isProtectedRoute) {
    const absoluteURL = new URL(routes.signIn, req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  // If there's a session, continue to the requested route
  return NextResponse.next();
};

export default middleware;

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
