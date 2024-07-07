// Without a defined matcher, this one line applies next-auth 
// to the entire project
// export { default } from "next-auth/middleware"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

export default withAuth(
   async function middleware(req) {

    if(!req.nextauth.token?.isEmailVerified) {
        return NextResponse.redirect(new URL(`/docs/${req.nextauth.token?.email}/email-not-verified`, req.url))
    }

    if(!req.nextauth.token?.accountStatus) {
        return NextResponse.redirect(new URL(`/docs/${req.nextauth.token?.email}/account-suspended`, req.url))
    }

    if(req.nextUrl.pathname.includes('admin') && req.nextauth.token.role != 'admin' && req.nextauth.token.role != 'roofa-agent') {
        return NextResponse.redirect(new URL('/not-found', req.url))
    }

      },
      {
        callbacks: {
            authorized: ({ token }) => token ? true : false
        }
      }
)

export const config = { matcher: [
    "/user/:path*", 
    "/admin/:path*",
] }