"use client";

import { useQuery } from "@tanstack/react-query";
import { getZaps } from "../api/function";
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

const ZapList: React.FC<{ email: string }> = ({ email }) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const {
    data: UserZaps,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getUserZaps"],
    queryFn: () => getZaps(email),
  });
  const DrawerList = (
    <Box sx={{ width: 100 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        { UserZaps && UserZaps.map((Zap:any) => (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                
              </ListItemIcon>
              <ListItemText primary={Zap.ZapName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
  console.log(UserZaps);

  return (
    <div>
    <Button onClick={toggleDrawer(true)}>Open drawer</Button>
    <Drawer open={open} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
    </div>
  );
};

export default ZapList;
