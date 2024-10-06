"use client"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function Home() {
  const router = useRouter();
  const {data,status} = useSession();
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
