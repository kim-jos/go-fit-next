import { Button, Divider, Stack, TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getDay } from "date-fns";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ErrorSnackBar from "../../../components/ErrorSnackBar";
import { getClassAvailability } from "../../../src/services/classes.api";
import { createReservation } from "../../../src/services/reservations.api";
import { ClassAvailability } from "../../../src/utils/database/database.entities";
import { ReservationStatus } from "../../../src/utils/enum";
import { SessionUser } from "../../../src/utils/session.type";
import { isValidReservationDate } from "../../../src/utils/validation/reservation.validation";

function MakeReservation({ classAvailability, classId }) {
  const currDate = new Date(Date.now());
  const [error, setError] = useState<string>();
  const [reservedDate, setReserveDate] = useState(currDate);
  const [classTimes, setClassTimes] =
    useState<Partial<ClassAvailability>[]>(classAvailability);
  const [inputTime, setInputTime] = useState<ClassAvailability>(
    classAvailability[0]
  );

  const { data } = useSession();
  const user: SessionUser = data?.user;

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

  const handleSubmit = async () => {
    if (!isValidReservationDate(reservedDate, inputTime)) {
      setError("Date is invalid");
      throw new Error("Date is invalid");
    }

    await createReservation({
      reservation_date: reservedDate,
      class_time: inputTime.id,
      class_id: classId,
      user_id: user.user_id,
      status: ReservationStatus.VALID,
    });
  };

  const handleClick = (classAvailability) => {
    setInputTime(classAvailability);
  };

  return (
    <>
      <Button onClick={() => setError("im a problem")}>click me</Button>
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

      {error ? <ErrorSnackBar error={error} /> : null}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const classId = context.params.id;
  const currWeekday = getDay(new Date(Date.now())); //get weekday(Sun ~ Sat) of date
  const classAvailability = await getClassAvailability(classId, currWeekday);
  return {
    props: { classAvailability, classId },
  };
}

export default MakeReservation;
