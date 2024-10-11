"use client";
import { signOut, signIn, useSession } from "next-auth/react";
import Dragable from "../subcomponents/dragable";
import axios from "axios";
import { Button, Drawer, TextField } from "@mui/material";
import { useState,useRef } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./../style.css";
export default function workflows() {
  const [isdrawerOpen, setIsdrawerOpen] = useState<boolean>(false);

  const [istriggerMenuOpen, setistriggerMenuOpen] = useState<boolean>(false);

  const buttonRef = useRef(null);
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
        {isdrawerOpen && (
          <Drawer
            open={isdrawerOpen}
            onClose={() => setIsdrawerOpen(false)}
            anchor="right"
          >
            <div className="flex justify-center flex-col ml-[20%]">
              <div className="mb-4 text-white bg-green-300 p-2 w-fit rounded-md mt-[10px] font-bold">
                Add Your Workflow details here
              </div>
              <TextField
                id="outlined-basic"
                label="Enter Workflow Name"
                variant="standard"
                className="w-1/2"
              />
              <Button
                id="demo-customized-button"
                variant="contained"

                className="w-1/2 !bg-[#D91656] mt-[10px]"
                disableElevation
                ref={buttonRef}
                onClick={() => setistriggerMenuOpen((prev) => !prev)}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Select Trigger
              </Button>
              <Menu
                id="outlined-basic"
                open={istriggerMenuOpen}
                onClose={() => setistriggerMenuOpen((prev) => !prev)}
                className="w-1/2"
                anchorEl={buttonRef.current}
                MenuListProps={{
                  "aria-labelledby": "Trigger",
                }}
                anchorOrigin={{
                  vertical: "bottom", // Opens the menu just below the button
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center", // Align the menu correctly with the button
                }}
              >
                <div>dasdas</div>
              </Menu>
            </div>
          </Drawer>
        )}
      </div>
      <div className="flex justify-center w-full mt-[20%]">
        <Dragable />
      </div>
    </div>
  );
}
