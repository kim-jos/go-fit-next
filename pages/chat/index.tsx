import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useState } from "react";
import { getReservations } from "../../src/services/reservations.api";
import { ReservationTransactions } from "../../src/utils/database/database.entities";

interface Reservation {
  allReservations: ReservationTransactions[];
}

export default function Chat({ allReservations }: Reservation) {
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const showReservations = () => {
    return allReservations.map((reservation: ReservationTransactions) => {
      return (
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          key={reservation.id}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" />
            </ListItemAvatar>
            <ListItemText
              primary="FIST 피스트"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`${reservation.reservation_date}`}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="middle" component="li" />
        </List>
      );
    });
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={tab} onChange={handleChange} centered>
          <Tab label="채팅" />
          <Tab label="예약한 멤버" />
        </Tabs>
      </Box>

      {tab ? showReservations() : null}
    </>
  );
}

export async function getStaticProps() {
  const allReservations = await getReservations();
  console.log("all reservations: ", allReservations);

  return {
    props: { allReservations },
  };
}
