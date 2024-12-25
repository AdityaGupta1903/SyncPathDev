"use client";
import * as React from "react";
import { Card } from "@fluentui/react-components";
import WarningIcon from "@mui/icons-material/Warning";
import { useEffect, useState } from "react";
import {
  Drawer,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { CreateSpreadSheetTrait, getUserDetails } from "../../api/function";
import { useSession } from "next-auth/react";
import DoneIcon from "@mui/icons-material/Done";
import { getSpreadSheets } from "../../api/function";

export default function () {
  const [isGmailConnected, setIsGmailConnected] = useState<boolean>(false);
  const [isSpreadSheetConnected, setIsSpreadSheetConnected] =
    useState<boolean>(false);
  const [isdraweropen, setIsdrawerOpen] = useState<boolean>(false);
  const [spreadSheetData, setSpreadSheetData] = useState<
    { id: string; title: string }[]
  >([]);
  const [traitname, setTraitName] = useState<string>();
  const [selectedSpreadSheetId, setSelectedSpreadSheetId] = useState<string>();
  const [selectedSpreadSheetName, setSelectedSpreadSheetName] =
    useState<string>();
  const { data, status } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  useEffect(() => {
    const processSpreadSheetDetails = async () => {
      if (data) {
        const res = await getSpreadSheets(data.user?.email ?? "");
        if (res) {
          let spreadSheet_data: { id: string; title: string }[] = [];
          res.spread_sheet_data.map((ele) => {
            let id = ele.id;
            let title = ele.title;
            spreadSheet_data.push({ id: id, title: title });
          });
          setSpreadSheetData(spreadSheet_data);
        }
      }
    };

    processSpreadSheetDetails();
  }, [data]);

  // console.log(selectedSpreadSheetId);
  return (
    <>
      <div className="flex min-h-screen justify-center w-full items-center">
        <div className="w-full flex h-full  flex-col justify-center items-center">
          <div className="w-full h-full flex justify-center">
            {isGmailConnected ? (
              <Card
                onClick={() => {}}
                className="w-[30%] m-2 hover:cursor-pointer"
              >
                <img
                  className="h-[40px] object-contain"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZCxnrD29c-ThXdrRlx-cDgae5X5nBYpw2fw&s"
                ></img>
                <div className="flex justify-center">Connect your Gmail</div>
              </Card>
            ) : (
              <Card
                onClick={() => {
                  window.open(
                    "https://syncpath.adityagupta.site/api/gmail/Login/login"
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
            )}

            {isGmailConnected ? (
              <DoneIcon color="success" />
            ) : (
              <WarningIcon color="warning" />
            )}
          </div>

          <div className="w-full h-full flex justify-center">
            {!isSpreadSheetConnected ? (
              <Card
                onClick={() => {
                  window.open(
                    "https://syncpath.adityagupta.site/api/spreadsheet/Login/login"
                  );
                }}
                className="w-[30%] p-3 m-2 hover:cursor-pointer"
              >
                <img
                  className="h-[40px] object-contain"
                  src="https://cdn.pixabay.com/photo/2017/03/08/21/21/spreadsheet-2127832_640.png"
                ></img>
                <div className="flex justify-center">
                  {" "}
                  Connect Your SpreadSheet
                </div>
              </Card>
            ) : (
              <Card
                onClick={() => {
                  setIsdrawerOpen((prev) => !prev);
                }}
                className="w-[30%] p-3 m-2 hover:cursor-pointer"
              >
                <img
                  className="h-[40px] object-contain"
                  src="https://cdn.pixabay.com/photo/2017/03/08/21/21/spreadsheet-2127832_640.png"
                ></img>
                <div className="flex justify-center">
                  {" "}
                  Connect Your SpreadSheet
                </div>
              </Card>
            )}

            {isSpreadSheetConnected ? (
              <DoneIcon color="success" />
            ) : (
              <WarningIcon color="warning" />
            )}
          </div>
        </div>
      </div>
      <Drawer
        open={isdraweropen}
        onClose={() => setIsdrawerOpen(false)}
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
            Add Your SpreadSheet Details
          </div>
          <Box className="w-full mb-5 py-4">
            <FormControl fullWidth>
              <InputLabel id="spreadsheet-select-label">
                Select SpreadSheet
              </InputLabel>
              <Select
                labelId="spreadsheet-select-label"
                id="spreadsheet-select"
                label="Select SpreadSheet"
                className="w-full mb-5"
                value={selectedSpreadSheetId}
                onChange={(e) => {
                  setSelectedSpreadSheetId(e.target.value);
                }}
                sx={{
                  "& .MuiSelect-select": {
                    padding: "10px",
                  },
                }}
              >
                {spreadSheetData.map((ele) => {
                  return (
                    <MenuItem key={ele.id} value={ele.id}>
                      {ele.title}
                    </MenuItem>
                  );
                })}
              </Select>
              <TextField
                id="workflow-name"
                label="Enter Trait Name"
                variant="outlined"
                className="w-full mb-5"
                value={traitname}
                onChange={(e) => setTraitName(e.target.value)}
                sx={{
                  "& label": { color: "#777" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#888",
                    },
                  },
                }}
              />
            </FormControl>
          </Box>
          <Button
            variant="contained"
            className="w-full mt-5"
            sx={{
              backgroundColor: "#4CAF50",
              padding: "10px 20px",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#45a049",
              },
            }}
            disabled={!(traitname && selectedSpreadSheetId)}
            onClick={async () => {
              CreateSpreadSheetTrait(
                traitname ?? "",
                selectedSpreadSheetId ?? "",
                "TestSpreadSheet",
                data?.user?.email ?? ""
              );
            }}
          >
            Submit
          </Button>
        </div>
      </Drawer>
    </>
  );
}
