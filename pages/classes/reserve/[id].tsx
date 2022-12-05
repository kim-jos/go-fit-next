import { Button, Card, Divider, Stack, TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getDay } from "date-fns";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { getClassAvailability } from "../../../src/services/classes.api";
import {
  cancelReservation,
  createReservation,
  getReservations,
} from "../../../src/services/reservations.api";
import {
  ClassAvailability,
  ReservationTransactions,
} from "../../../src/utils/database/database.entities";
import { isInvalidCancelation } from "../../../src/utils/validation/cancelation.validation";
import { isValidReservationDate } from "../../../src/utils/validation/reservation.validation";

function MakeReservation({ classAvailability, classId, allReservations }) {
  const {
    data: { user },
  } = useSession();
  const currDate = new Date(Date.now());

  const [reservedDate, setReserveDate] = useState(currDate);
  const [classTimes, setClassTimes] =
    useState<Partial<ClassAvailability>[]>(classAvailability);
  const [inputTime, setInputTime] = useState<ClassAvailability>(
    classAvailability[0]
  );

  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 13);

  const getClassAvailableTimes = async (date) => {
    const reservationDate = new Date(date);
    setReserveDate(reservationDate);

    await getNewClassTimes(reservationDate);
  };

  const getNewClassTimes = async (reservationDate: Date) => {
    const reservationWeekday = getDay(reservationDate); //get weekday(Sun ~ Sat) of date
    const newClassTimes = await getClassAvailability(
      classId,
      reservationWeekday
    );
    setClassTimes(newClassTimes);
  };

  const showReservations = (): JSX.Element[] => {
    const reservations = allReservations?.map(
      (reservation: ReservationTransactions) => (
        <Card key={reservation.id} sx={{ margin: "10px" }}>
          <div>userId: {reservation.user_id}</div>
          <>
            reservation date:{" "}
            {new Date(reservation.reservation_date).toLocaleDateString("ko-KO")}
          </>
          <div>classTime: {reservation.class_time}</div>
          <Button onClick={() => handleCancel(reservation)} variant="outlined">
            Cancel
          </Button>
        </Card>
      )
    );
    return reservations;
  };

  const handleCancel = async (reservation: ReservationTransactions) => {
    if (isInvalidCancelation(reservation)) {
      throw new Error("Date is invalid");
    }
    await cancelReservation(reservation);
    console.log("cancel");
  };

  const handleSubmit = async () => {
    if (!isValidReservationDate(reservedDate, inputTime)) {
      throw new Error("Date is invalid");
    }

    await createReservation({
      reservation_date: reservedDate,
      class_time: inputTime.id,
      class_id: classId,
      user_id: user.user_id,
    });
  };

  const handleClick = (classAvailability) => {
    setInputTime(classAvailability);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          minDate={currDate}
          maxDate={twoWeeksFromNow}
          label="날짜 선택"
          inputFormat="yyyy/MM/dd"
          value={reservedDate}
          onChange={(date) => {
            setReserveDate(date);
            getClassAvailableTimes(date);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      {classTimes.length
        ? classTimes.map((classTime: ClassAvailability) => (
            <div key={classTime.id}>
              <Stack direction="column" spacing={1}>
                <Button
                  variant="outlined"
                  onClick={() => handleClick(classTime)}
                >
                  {`${classTime.time}`}
                </Button>
              </Stack>
              <Divider />
            </div>
          ))
        : null}

      <Button variant="contained" onClick={handleSubmit}>
        예약하기
      </Button>
      {inputTime ? inputTime.time : null}

      <div>{showReservations()}</div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const classId = context.params.id;
  const currWeekday = getDay(new Date(Date.now())); //get weekday(Sun ~ Sat) of date
  const classAvailability = await getClassAvailability(classId, currWeekday);
  const allReservations = await getReservations();

  return {
    props: { classAvailability, classId, allReservations },
  };
}

export default MakeReservation;
