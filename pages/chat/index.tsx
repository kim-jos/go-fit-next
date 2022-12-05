import GroupsIcon from "@mui/icons-material/Groups";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { Backdrop } from "@mui/material";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useState } from "react";

const actions = [
  { icon: <GroupsIcon />, name: "운동 파트너" },
  { icon: <ModeCommentIcon />, name: "운동 수다방" },
];

export default function Chat({ groups }) {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (_, newValue) => setTab(newValue);

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={tab} onChange={handleChange} centered>
          <Tab label="채팅" />
          <Tab label="예약한 멤버" />
        </Tabs>
      </Box>

      <Box sx={{ height: "80vh", transform: "translateZ(0px)", flexGrow: 1 }}>
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="Create Chat"
          sx={{ position: "absolute", bottom: 100, right: 30 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
