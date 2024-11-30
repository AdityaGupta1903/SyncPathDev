"use client";
import {
  Button,
  Card,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
} from "@fluentui/react-components";
import MailIcon from "@mui/icons-material/Mail";
import WarningIcon from "@mui/icons-material/Warning";
import { OverlayDrawer } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Drawer, TextField } from "@mui/material";
import { getUserDetails } from "../api/function";
import { useSession } from "next-auth/react";
import DoneIcon from "@mui/icons-material/Done";

export default function () {
  const [isGmailConnected, setIsGmailConnected] = useState<boolean>(false);
  const [isSpreadSheetConnected, setIsSpreadSheetConnected] =
    useState<boolean>(false);
  const { data, status } = useSession();

  useEffect(() => {
    const getdetails = async () => {
      if (data) {
        const res = await getUserDetails(data.user?.email ?? "");
        if (res) {
          if (res.isGmailConnected) {
            setIsGmailConnected(true);
          }
          if (res.isSpreadSheetConnected) {
            setIsSpreadSheetConnected(true);
          }
        }
      }
    };
    getdetails();
  }, [data]);
  console.log(isGmailConnected + " " + isSpreadSheetConnected);
  return (
    <>
      <div className="flex min-h-screen justify-center w-full items-center">
        <div className="w-full flex h-full  flex-col justify-center items-center">
          <div className="w-full h-full flex justify-center">
            <Card
              onClick={() => {
                window.open(
                  "http://localhost:3000/api/spreadsheet/Login/login"
                );
              }}
              className="w-[30%] m-2 hover:cursor-pointer"
            >
              <img
                className="h-[40px] object-contain"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZCxnrD29c-ThXdrRlx-cDgae5X5nBYpw2fw&s"
              ></img>
              <div className="flex justify-center">Connect your Gmail</div>
            </Card>
            {isGmailConnected ? (
              <DoneIcon color="success" />
            ) : (
              <WarningIcon color="warning" />
            )}
          </div>

          <div className="w-full h-full flex justify-center">
            <Card className="w-[30%] p-3 m-2 hover:cursor-pointer">
              <img
                className="h-[40px] object-contain"
                src="https://cdn.pixabay.com/photo/2017/03/08/21/21/spreadsheet-2127832_640.png"
              ></img>
              <div className="flex justify-center">
                {" "}
                Connect Your SpreadSheet
              </div>
            </Card>
            {isSpreadSheetConnected ? (
              <DoneIcon color="success" />
            ) : (
              <WarningIcon color="warning" />
            )}
          </div>
        </div>
      </div>
      {/* <Drawer
        open={isGmailDrawerOpen}
        onClose={() => setIsGmailDrawerOpen(false)}
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            width: "30%",
            padding: "20px",
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
          },
        }}
        
      >
        <div className="flex flex-col items-center">
          <div className="mb-4 text-gray-800 bg-green-400 py-3 px-5 rounded-md font-bold shadow-md">
            Add Your Workflow Details
          </div>
        </div>
      </Drawer> */}
    </>
  );
}
