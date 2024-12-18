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
import { useContext } from "react";
import { ZapContext } from "..";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";

export default function Workflows() {
  let id = window.location.href.split("?")[1]?.split("=")[1];
  if (typeof id !== "string") {
    id = "";
  }
  const router = useRouter();
  // console.log(id)
  const session = useSession();
  const zapcontext = useContext(ZapContext);
  const {
    data: UserZaps,
    isLoading,
    refetch: RefetchUserZaps,
  } = useQuery({
    queryKey: ["getUserZaps"],
    queryFn: async () => await getZaps(id),
  });
  useEffect(() => {
    if (UserZaps && UserZaps?.length > 0)
      zapcontext.setSelectedZap(UserZaps?.length - 1);
  }, [UserZaps]);
  console.log(UserZaps);
  console.log(zapcontext.selectedZap);
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

      <div className="relative top-20 w-full">
        <div className="text-xl pl-3">Select From Templates</div>
        <div className="flex w-full p-3 m-3">
          <Card
            onClick={() => {
              router.push("/Templates/spreadsheet");
            }}
            className="p-3 m-3 !w-1/3 hover:cursor-pointer"
          >
            <img src="https://i.ytimg.com/vi/1kNO1MA8i5w/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBEb_L4-xc4yz78-31jB2cRlDnD_w"></img>
            <div className="p-2 font-bold">
              Save Emails to the SpreadSheet Matching Cetain Traits
            </div>
          </Card>
          <Card
            onClick={() => {
              router.push("/Templates/attachment");
            }}
            className="p-3 m-3 !w-1/3 hover:cursor-pointer"
          >
            <img src="https://media.licdn.com/dms/image/D4D12AQGJIY3gKPygGw/article-cover_image-shrink_720_1280/0/1715861122380?e=2147483647&v=beta&t=Ckwcmho8bq5fZeXaX6W_AqhgQUIayEt_M9YQS0z0kFA"></img>
            <div className="p-2 flex justify-center font-bold">
              Save Attachments to the Google Drive
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
