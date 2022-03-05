// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
import type { NextRequest } from "next/server"
import type { JWT } from "next-auth/jwt"

import withAuth from "next-auth/middleware"
import { Token } from "pages/api/auth/[...nextauth]"

export default withAuth(
  function middleware(req: NextRequest & { nextauth: { token: JWT } }) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }: { token: Token }) => token?.userRole === "admin",
    },
  }
)
