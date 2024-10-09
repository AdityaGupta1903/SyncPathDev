"use client"
import { signOut,signIn } from "next-auth/react"
import Dragable from "../subcomponents/dragable";
export default function workflows(){
    return <div>
        <div className="flex justify-between w-full">
            <div className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500">
             User Name  
            </div>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500" onClick={()=>signOut({callbackUrl:'/'})}>
              Signout
            </button>
        </div>
        <div className="flex justify-center w-full mt-[20%]">
           <Dragable/>
        </div>
    </div>
       
}