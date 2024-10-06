import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import prisma from "@shared/db";


export const authOptions = {
  // Configure one or more authentication providers
  sercret:process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: { label: "email", type: "email", placeholder: "Your email" },
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
      authorization:{
        params: {
          access_type: 'offline', // for refresh tokens
          prompt: 'consent' // to force user re-consent
        }
      },
    },
  
  ),


  ],
  callbacks:{
    async signIn(details:any) {
      console.log(details);
      return false
    },
    async session(session:any) {
      // you can entry here for any db related things
      console.log(session);
      return session;
    },
  }
  
  

}

export default NextAuth(authOptions);

