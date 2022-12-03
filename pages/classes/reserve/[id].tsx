import {
  Button,
  Divider,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getDay } from "date-fns";
import { Form, Formik } from "formik";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { getClassAvailability } from "../../../src/services/classes.api";
import { getReservations } from "../../../src/services/reservations.api";
import {
  ClassAvailability,
  ReservationTransactions,
} from "../../../src/utils/database/database.entities";
import styles from "../../../styles/Home.module.css";

// interface IClass {
//   classAvailability: ClassAvailability[];
//   classId: number;
//   allReservations: ReservationTransactions[];
// }

function MakeReservation({ classAvailability, classId, allReservations }) {
  const currDate = new Date(Date.now());
  const session = getSession().then((x) => console.log("session: ", x));

  const [reservedDate, setReserveDate] = useState(currDate);
  const [classTimes, setClassTimes] = useState(classAvailability);
  const [inputTime, setInputTime] = useState(classAvailability[0]);

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

  const showClassAvailableTimes = () => {
    return classTimes.map((classTime: ClassAvailability) => (
      <div key={classTime.id}>
        <ListItemButton onClick={(time) => setInputTime(time)}>
          <ListItemText>{`${classTime.time}`}</ListItemText>
        </ListItemButton>
        <Divider />
      </div>
    ));
  };

  const showReservations = () => {
    return allReservations?.map((reservation: ReservationTransactions) => (
      <div key={reservation.id}>
        <div>{reservation.user_id}</div>
      </div>
    ));
  };

  const handleSubmit = (date, time) => {
    // if (!isValidReservationDate(reservedDate, time)) {
    //   throw new Error("Date is invalid");
    // }
    console.log(`handleSubmit: ${date}, ${time}`);
    // createReservation({ reservation_date: date, class_time: time }, 1);
  };

  return (
    <>
      <div className={styles.container}>
        <Formik
          initialValues={{ date: reservedDate, time: inputTime }}
          onSubmit={async (values) => {
            console.log("date: ", values.date);
            const { time } = values.time;
            console.log("time: ", time);
            // handleSubmit(values.date, values.time);
          }}
        >
          <Form>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                minDate={currDate}
                maxDate={twoWeeksFromNow}
                label="날짜 선택"
                inputFormat="MM/dd/yyyy"
                value={reservedDate}
                onChange={(date) => {
                  getClassAvailableTimes(date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <div></div>

            {classTimes.length ? showClassAvailableTimes() : null}

            <Button variant="contained" type="submit">
              예약하기
            </Button>
          </Form>
        </Formik>
        Reservations of Users
        {allReservations.length ? showReservations() : null}
      </div>
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
