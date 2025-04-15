import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl;
  
  // Log for debugging
  console.log(`Middleware processing: ${pathname}`);

  // Check if the path starts with /admin but is not the login page
  if (pathname.startsWith('/admin') && 
      !pathname.startsWith('/admin/login') &&
      !pathname.startsWith('/admin/test')) { // Allow test page without auth
    
    // Check if there's a valid session cookie or token
    const adminSession = request.cookies.get('admin_session')?.value;
    console.log(`Admin session for ${pathname}: ${adminSession ? 'exists' : 'missing'}`);
    
    // If no valid session, redirect to login
    if (!adminSession) {
      console.log(`Redirecting to login from: ${pathname}`);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // Add security headers to all responses
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Add Content-Security-Policy header for additional security
  // Customize this based on your app's needs
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'"
  );
  
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Match all routes
    '/(.*)', 
  ],
}; 