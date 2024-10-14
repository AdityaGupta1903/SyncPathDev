"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Drawer, TextField } from "@mui/material";
import { useRef } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";
import { useSession } from "next-auth/react";
import { CreatenewZap, getAvailabletriggers } from "../api/function";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useQuery } from "@tanstack/react-query";

const DrawerComp: React.FC<{
  isdrawerOpen: boolean;
  setIsdrawerOpen: Dispatch<SetStateAction<boolean>>;
  istriggerMenuOpen: boolean;
  setistriggerMenuOpen: Dispatch<SetStateAction<boolean>>;
}> = ({
  isdrawerOpen,
  setIsdrawerOpen,
  istriggerMenuOpen,
  setistriggerMenuOpen,
}) => {
  const session = useSession();
  const [workflowName, setWorkflowName] = useState<string>("");
  const [triggerId, setTriggerId] = useState<string>("");
  const buttonRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    data: AvailableTriggerData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getAvailabletrigger"],
    queryFn: getAvailabletriggers,
  });
  console.log(AvailableTriggerData);

  return (
    <>
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
              className="w-1/2 !mb-[30px]"
              onChange={(e) => {
                setWorkflowName(e.target.value);
              }}
            />
            {/* <Button
              id="demo-customized-button"
              variant="contained"
              className="!w-1/2 !bg-[#D91656]  "
              disableElevation
              ref={buttonRef}
              onClick={() => setistriggerMenuOpen((prev) => !prev)}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Select Trigger
            </Button> */}
            {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"Select Trigger"}
              label="Age"
              className="!w-1/2"
            >
              { !isLoading && AvailableTriggerData.map((item: { AvailabletriggerId: React.SetStateAction<string>; TriggerName: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; })=>{
                 return <MenuItem
                 className="!w-1/2"
                 onClick={() => {
                  setTriggerId(item.AvailabletriggerId);
                 }}
               >
                 {item.TriggerName}
               </MenuItem>
              })}
            </Select> */}
            <Box sx={{ minWidth: 20 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Trigger
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Trigger"
                  className="!w-1/2"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxWidth: "10%",
                        width: "10%",
                      },
                    },
                  }}
                >
                  {!isLoading &&
                    AvailableTriggerData.map(
                      (item: {
                        AvailabletriggerId: React.SetStateAction<string>;
                        TriggerName:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | null
                          | undefined;
                      }) => {
                        return (
                          //@ts-ignore
                          <MenuItem
                            value={item.TriggerName ?? ""}
                            id={item.AvailabletriggerId}
                            onClick={() => {
                              setTriggerId(item.AvailabletriggerId);
                            }}
                          >
                            {item.TriggerName ?? ""}
                          </MenuItem>
                        );
                      }
                    )}
                </Select>
              </FormControl>
            </Box>
            <Button
              className="!mt-[30px] !w-1/2"
              variant="outlined"
              onClick={async () => {
                  console.log("sdasd")
                  const res = await CreatenewZap(
                    session.data?.user?.email?.toString() ?? "",
                    workflowName
                  );
                  if (res) {
                    const UserId = res.UserId;
                    const ZapId = res.ZapId;

                  }
               
              }}
            >
              Submit
            </Button>
          </div>
        </Drawer>
      )}
    </>
  );
};
export default DrawerComp;
