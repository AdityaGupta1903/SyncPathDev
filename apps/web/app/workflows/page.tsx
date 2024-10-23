"use client";
import { signOut, signIn, useSession } from "next-auth/react";
import Dragable from "../subcomponents/dragable";
import { useEffect, useState } from "react";
import "./../style.css";
import DrawerComp from "../subcomponents/drawer";
import ZapList from "../subcomponents/zapList";
import { getZaps } from "../api/function";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Workflows() {  
  let id = window.location.href.split("?")[1]?.split("=")[1];
  if(typeof(id) !=="string"){
    id = ""
  }
  const session = useSession();
      const [isdrawerOpen, setIsdrawerOpen] = useState<boolean>(false);
      const [istriggerMenuOpen, setistriggerMenuOpen] = useState<boolean>(false);
      const [Loading, setLoading] = useState<boolean>(false);
      const [selectedZap,setSelectedZap] = useState<number>()
      const {
        data : UserZaps,
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ["getUserZaps"],
        queryFn: async() => await getZaps(id),
      });
  
      
    
    // console.log(UserZaps)
    
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <div className="w-full flex justify-between items-center px-10 py-4 bg-white shadow-lg">
          <div className="text-lg font-semibold text-gray-800">
            {session?.data?.user?.name ?? "User Name"}
          </div>
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-md"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
        </div>
  
        <div className="mt-16 flex flex-col items-center">
          <button
            className="bg-green-500 text-white py-3 px-8 rounded-full hover:bg-green-400 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none"
            onClick={() => {
              setIsdrawerOpen(true);
            }}
          >
            Create a New Workflow
          </button>
          <DrawerComp
            isdrawerOpen={isdrawerOpen}
            setIsdrawerOpen={setIsdrawerOpen}
            istriggerMenuOpen={istriggerMenuOpen}
            setistriggerMenuOpen={setistriggerMenuOpen}
            Loading={Loading}
            setLoading={setLoading}
            
          />
        </div>
       {id !== "" && UserZaps!==undefined && <ZapList UserZaps = {UserZaps} setSelectedZap = {setSelectedZap} ></ZapList>} 
       
       
      </div>
    );
    
  
  
}


