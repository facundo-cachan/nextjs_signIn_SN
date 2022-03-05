import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
/*
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0"
import AppleProvider from "next-auth/providers/apple"
import EmailProvider from "next-auth/providers/email"
*/

export type Token = {
  name: string
  email: string
  picture: string
  sub: string
  userRole: string
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

const options = {
  // https://next-auth.js.org/configuration/providers/oauth
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  theme: {
    colorScheme: "dark",
  },
  pages: {
    /* signIn: '/pages/signin', */
    error: "/pages/error", // Error code passed in query string as ?error=
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: Token
      user: {
        name: string
        email: string
        image: string
      }
      account: {
        provider: string
        type: string
        id_token: string
        expires_at: 1643340551
        refresh_token: string
      }
    }) {
      console.log("NextAuth Callbacks JWT")
      console.log({ account, user, token })
      if (account && user) {
        token.userRole = "admin"
        return {
          accessToken: account.id_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user,
          provider: account.provider,
          type: account.type,
        }
      }
      return token
    },
  },
}
const CustomNetcAuth = (req: any, res: any) => NextAuth(req, res, options)
export default CustomNetcAuth
