import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@shared/db";

export const authOptions = {
    // Configure one or more authentication providers
    providers:[ 
        CredentialsProvider({
            name: "Login",
            credentials: {
              username: { label: "Username", type: "text", placeholder: "Aditya" },
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
          })
    
    ]
   
  }

export default NextAuth(authOptions);
  
