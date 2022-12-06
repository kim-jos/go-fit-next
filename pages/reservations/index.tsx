import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { getReservations } from "../../src/services/reservations.api";
import { SessionUser } from "../../src/utils/session.type";
interface IReserve {
  id: number;
  created_at: Date;
  user_id: number;
  class_id: number;
  reservation_date: Date;
  class_time: number;
  class: { name: string };
  classAvailability: { weekday: number; time: Date };
  user: { name: string };
}
interface Reservations {
  allReservations: IReserve[];
}

function ReservationsList({ allReservations }: Reservations) {
  const { data } = useSession();
  const user: SessionUser = data?.user;

  const showReservations = () => {
    return allReservations.map((reservation: IReserve) => {
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
              primary={reservation.user.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`${reservation.reservation_date} ${reservation.class.name}`}
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

  return <>{showReservations()}</>;
}
export async function getServerSideProps() {
  const allReservations = await getReservations();
  console.log("all reservations: ", allReservations);

  return {
    props: { allReservations },
  };
}

export default ReservationsList;
