"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Button, Drawer, TextField } from "@mui/material";
import { useRef } from "react";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";
import { getAvailabletriggers } from "../api/function";

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
  const buttonRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  getAvailabletriggers();
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
              className="w-1/2"
            />
            <Button
              id="demo-customized-button"
              variant="contained"
              className="!w-1/2 !bg-[#D91656] !mt-[10px]"
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
              className="!w-1/2 !mt-[10px]"
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
              <MenuItem>Web Hook</MenuItem>
            </Menu>
          </div>
        </Drawer>
      )}
    </>
  );
};
export default DrawerComp;
