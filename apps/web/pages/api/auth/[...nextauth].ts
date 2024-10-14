import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import prisma from "@shared/db";
import jwt from "jsonwebtoken"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: { label: "email", type: "email", placeholder: "enter email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log(credentials);
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          access_type: 'offline', // for refresh tokens
          prompt: 'consent' // to force user re-consent
        }
      },
    },

    ),
  ],
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        sameSite: 'none',
      }
    }
  },
  callbacks: {
    async jwt({ account, token, user }) {
      return token;
    },
    async session({ session, token, user }) {
      return session
    },
    async signIn(details: any) {
      const user = await prisma.user.findUnique({
        where: {
          email: details.user.email
        }
      })
      if (!user) {
        const user = await prisma.user.create({
          data: {
            email: details.user.email,
            Password: "OAuthPassword"
          }
        })
        if (user) {

          return true;
        }
      }
      return true;
    },
  },
  session: {
    strategy: "jwt"
  }
}

export default NextAuth(authOptions);

