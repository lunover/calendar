import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define the allowed API URL patterns
  const allowedApiPatterns = [
    /^\/api\/calendar\/\d{4}$/, // Matches /api/calendar/{YEAR}
    /^\/api\/convert\/(bs-ad|ad-bs)\/\d{4}-\d{2}-\d{2}$/ // Matches /api/convert/{format}/{date} where format is either "bs-ad" or "ad-bs"
  ];

  // Check if the request is for an API route
  if (pathname.startsWith('/api')) {
    // If the API route doesn't match any allowed pattern, redirect to homepage or return 401
    const isAllowed = allowedApiPatterns.some(pattern => pattern.test(pathname));
    if (!isAllowed) {
      // return a 401 status:
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  // Allow all other requests to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
