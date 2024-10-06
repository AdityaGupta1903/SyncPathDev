"use client"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import prisma from "@shared/db";
export default function Home() {
  const router = useRouter();
  const data = useSession();
 
  if(data){
    console.log(data);
  }
  else{
    console.log("adad")
    // router.push('/api/auth/signin')
  }
  


  return (
     
    <div></div>
  );
}
