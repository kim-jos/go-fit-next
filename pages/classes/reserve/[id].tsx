import { Button, Divider, Stack, TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getDay } from "date-fns";
import { useState } from "react";
import { getClassAvailability } from "../../../src/services/classes.api";
import { createReservation } from "../../../src/services/reservations.api";
import {
  ClassAvailability,
  ReservationTransactions,
} from "../../../src/utils/database/database.entities";
import { isValidReservationDate } from "../../../src/utils/validation/reservation.validation";

function MakeReservation({ classAvailability, classId, allReservations }) {
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
        <div key={reservation.id}>
          <div>userId: {reservation.user_id}</div>
          <>
            reservation date:{" "}
            {new Date(reservation.reservation_date).toLocaleDateString("ko-KO")}
          </>
          <div>classTime: {reservation.class_time}</div>
        </div>
      )
    );
    return reservations;
  };

  const handleSubmit = async () => {
    if (!isValidReservationDate(reservedDate, inputTime)) {
      throw new Error("Date is invalid");
    }

    await createReservation({
      reservation_date: reservedDate,
      class_time: inputTime.id,
      class_id: classId,
      user_id: 2,
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
    </>
  );
}

export default MakeReservation;
