import {
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getDay } from "date-fns";
import { Form, Formik } from "formik";
import { useState } from "react";
import { getClassAvailability } from "../../../src/services/classes.api";
import styles from "../../../styles/Home.module.css";

function MakeReservation({ classAvailability, classId }) {
  const currDate = new Date(Date.now());
  const [reservedDate, setReserveDate] = useState(currDate);
  const [classTimes, setClassTimes] = useState(classAvailability);
  const [inputTime, setInputTime] = useState(classAvailability[0]);
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 13);

  const getClassAvailableTimes = async (date) => {
    const reservationDate = new Date(date);
    setReserveDate(reservationDate);
    const reservationWeekday = getDay(reservationDate); //get weekday(Sun ~ Sat) of date
    const newClassTimes = await getClassAvailability(
      classId,
      reservationWeekday
    );
    setClassTimes(newClassTimes);
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
        <Button>{`${reservedDate}`}</Button>
        <Formik
          initialValues={{ date: reservedDate, time: inputTime }}
          onSubmit={async (values) => {
            handleSubmit(values.date, values.time);
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
            <List>
              {classTimes.length
                ? classTimes.map((classTime) => {
                    return (
                      <>
                        <ListItemButton
                          component="a"
                          key={classTime.id}
                          onClick={(time) => setInputTime(time)}
                        >
                          <ListItemText>{classTime.time}</ListItemText>
                        </ListItemButton>
                        <Divider />
                      </>
                    );
                  })
                : null}
            </List>
            <Button variant="contained" type="submit">
              예약하기
            </Button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const classId = context.params.id;
  const currWeekday = 1;
  const classAvailability = await getClassAvailability(classId, currWeekday);

  return {
    props: { classAvailability, classId },
  };
}

export default MakeReservation;
