import { Button, Select } from "@mui/material";
import { getDay } from "date-fns";
import { Form, Formik } from "formik";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { getClassAvailability } from "../../../src/services/classes.api";
import { isValidReservationDate } from "../../../src/utils/validation/reservation.validation";
import styles from "../../../styles/Home.module.css";

function MakeReservation({ classAvailability, classId }) {
  const currDate = new Date(Date.now());
  const [reservedDate, setReserveDate] = useState(currDate);
  const [classTimes, setClassTimes] = useState(classAvailability);
  const [inputTime, setInputTime] = useState(classAvailability[0]);

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
    if (isValidReservationDate(reservedDate, time)) {
      throw new Error("Date is invalid");
    }
    alert(`handleSubmit: ${date}, ${time}`);
    // createReservation({ reservation_date: date, class_time: time }, 1);
  };

  return (
    <>
      <main className={styles.container}>
        <Formik
          initialValues={{ date: reservedDate, time: inputTime }}
          onSubmit={async (values) => {
            // alert(`values: ${values.date}, ${values.time}`);

            handleSubmit(values.date, values.time);
          }}
        >
          <Form>
            <DatePicker
              selected={reservedDate}
              onChange={(date) => getClassAvailableTimes(date)}
            />
            <Select
              placeholder="시간 선택"
              onSelect={(time) => setInputTime(time)}
              // onChange={(time) => setClassTimes(time)}
            >
              {classTimes.length
                ? classTimes.map((classTime) => {
                    return <option>{classTime.time}</option>;
                  })
                : null}
            </Select>
            <Button type="submit">예약하기</Button>
          </Form>
        </Formik>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const currDate = new Date(Date.now());

  const classId = context.params.id;
  // const currWeekday = getDay(currDate);
  const currWeekday = 1;
  const classAvailability = await getClassAvailability(classId, currWeekday);

  return {
    props: { classAvailability, classId },
  };
}

export default MakeReservation;
