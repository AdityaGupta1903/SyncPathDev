"use client";

import "./../style.css";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { Daum, Root } from "../models/UserZaps";
import { useContext } from "react";
import { ZapContext } from "..";

const ZapList: React.FC<{
  UserZaps: Root;
  setSelectedZap: Dispatch<SetStateAction<number | undefined>>;
}> = ({ UserZaps, setSelectedZap }) => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  console.log(UserZaps);
  let zapcontext = useContext(ZapContext);
  const DrawerList = (
    <Box
      sx={{ width: "100%" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List className="w-full">
        {UserZaps &&
          UserZaps?.map((Zap: any, index: number) => (
            <ListItem className="hover:bg-green-200  hover:text-white">
              <ListItemButton>
                <ListItemText
                  primary={Zap.ZapName}
                  onClick={() => {
                    zapcontext.setSelectedZap(index);
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        <Divider />
      </List>
    </Box>
  );
  console.log(UserZaps);

  return (
    <div className="w-full">
      <Button
        className="rounded-lg"
        onClick={toggleDrawer(true)}
        variant="outlined"
      >
        Previous Workflows
      </Button>
      <Drawer sx={{ width: "20%" }} open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default ZapList;
