"use client";
import { signOut, signIn, useSession } from "next-auth/react";
import Dragable from "../subcomponents/dragable";
import axios from "axios";
import { Button, Drawer, TextField } from "@mui/material";
import { useState,useRef } from "react";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./../style.css";
import DrawerComp from "../subcomponents/drawer";

export default function workflows() {
  const [isdrawerOpen, setIsdrawerOpen] = useState<boolean>(false);
  const [istriggerMenuOpen, setistriggerMenuOpen] = useState<boolean>(false);
  const session = useSession();
  console.log(session.data?.user?.email);
  const CreatenewZap = async () => {
    const res = await axios.post("http://localhost:3002/api/v1/CreateZap", {
      email: session.data?.user?.email?.toString(),
      ZapName: "TestZap",
    });
    console.log(res);
  };
  return (
    <div>
      <div className="flex justify-between w-full">
        <div className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500">
          User Name
        </div>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Signout
        </button>
      </div>
      <div className="flex justify-center  mt-20">
        <button
          className="hover:cursor-pointer text-white bg-green-300 p-2 rounded-lg"
          onClick={() => {
            setIsdrawerOpen(true);
          }}
        >
          Create a new WorkFlow
        </button>
        <DrawerComp isdrawerOpen = {isdrawerOpen} setIsdrawerOpen={setIsdrawerOpen} istriggerMenuOpen = {istriggerMenuOpen} setistriggerMenuOpen={setistriggerMenuOpen}/>
      </div>
      <div className="flex justify-center w-full mt-[20%]">
        <Dragable />
      </div>
    </div>
  );
}
