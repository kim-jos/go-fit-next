import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Button, Card } from "@mui/material";
import { useState } from "react";
import {
  cancelReservation,
  getUserReservations,
} from "../../src/services/reservations.api";
import { ReservationTransactions } from "../../src/utils/database/database.entities";
import { isInvalidCancelation } from "../../src/utils/validation/cancelation.validation";

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
  myReservations: IReserve[];
}

function MyReservations({ myReservations }: Reservations) {
  const [error, setError] = useState<string>();

  const handleCancel = async (reservation: ReservationTransactions) => {
    if (await isInvalidCancelation(reservation)) {
      setError("Date is invalid");
      throw new Error("Date is invalid");
    }

    await cancelReservation(reservation);
    console.log("cancel");
  };

  const showMyReservations = () => {
    return myReservations.map((reservation) => {
      return (
        <>
          <Card
            sx={{
              marginY: "7px",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
            key={reservation.id}
          >
            <Box sx={{ flexDirection: "column" }}>
              <div>{reservation.class.name}</div>
              <span>{`${reservation.reservation_date}`}</span>
              <span> </span>
              <span>{`${reservation.classAvailability.time}`}</span>
            </Box>
            <Button
              onClick={() =>
                handleCancel(reservation as unknown as ReservationTransactions)
              }
            >
              <CancelIcon />
            </Button>
          </Card>
        </>
      );
    });
  };

  return (
    <>
      <div>{showMyReservations()}</div>
    </>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const myReservations = await getUserReservations(id);
  return {
    props: { myReservations },
  };
}

export default MyReservations;
