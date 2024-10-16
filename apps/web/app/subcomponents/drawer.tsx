"use client";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  Button,
  Drawer,
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useSession } from "next-auth/react";
import {
  CreatenewZap,
  getAvailabletriggers,
  CreatenewTrigger,
} from "../api/function";
import { useQuery } from "@tanstack/react-query";
import { ColorRing } from "react-loader-spinner";

const DrawerComp: React.FC<{
  isdrawerOpen: boolean;
  setIsdrawerOpen: Dispatch<SetStateAction<boolean>>;
  istriggerMenuOpen: boolean;
  setistriggerMenuOpen: Dispatch<SetStateAction<boolean>>;
  Loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}> = ({
  isdrawerOpen,
  setIsdrawerOpen,
  istriggerMenuOpen,
  setistriggerMenuOpen,
  Loading,
  setLoading,
}) => {
  const session = useSession();
  const [workflowName, setWorkflowName] = useState<string>("");
  const [triggerId, setTriggerId] = useState<string>("");

  const { data: AvailableTriggerData, isLoading } = useQuery({
    queryKey: ["getAvailabletrigger"],
    queryFn: getAvailabletriggers,
  });

  return (
    <>
      {isdrawerOpen && (
        <Drawer
          open={isdrawerOpen}
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
              Add Your Workflow Details
            </div>

            <TextField
              id="workflow-name"
              label="Enter Workflow Name"
              variant="outlined"
              className="w-full mb-5"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
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

            <Box className="w-full mb-5">
              <FormControl fullWidth>
                <InputLabel id="trigger-select-label">
                  Select Trigger
                </InputLabel>
                <Select
                  labelId="trigger-select-label"
                  id="trigger-select"
                  value={triggerId}
                  label="Select Trigger"
                  className="w-full"
                  onChange={(e) => setTriggerId(e.target.value)}
                  sx={{
                    "& .MuiSelect-select": {
                      padding: "10px",
                    },
                  }}
                >
                  {!isLoading &&
                    AvailableTriggerData?.map(
                      (item: {
                        AvailabletriggerId: string;
                        TriggerName: string;
                      }) => (
                        <MenuItem
                          key={item.AvailabletriggerId}
                          value={item.AvailabletriggerId}
                        >
                          {item.TriggerName}
                        </MenuItem>
                      )
                    )}
                </Select>
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
              disabled={workflowName == "" || triggerId == "" || Loading}
              onClick={async () => {
                const Zap = await CreatenewZap(
                  session.data?.user?.email?.toString() ?? "",
                  workflowName
                );
                if (Zap) {
                  // Handle the response here and Create trigger
                  const ZapId: string = Zap.ZapId;
                  const trigger = await CreatenewTrigger(ZapId, triggerId);
                  if (trigger) {
                    setLoading(true);
                    setTimeout(() => {
                      setIsdrawerOpen(false);
                      setLoading(false);
                    }, 3000);
                  }
                }
              }}
            >
              Submit
            </Button>
           { Loading && <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            ></ColorRing>}
          </div>
        </Drawer>
      )}
    </>
  );
};

export default DrawerComp;
