import { differenceInMinutes } from "date-fns";

export function isValidReservationDate(reservedDate: Date) {
  if (!isReservationBeforeClass(reservedDate)) {
    return false;
  }
  // current time is not after reserved time + date
  return true;
}

function isReservationBeforeClass(reservedDate: Date) {
  const currDate = new Date(Date.now());
  // reservation: at least one day before class
  if (differenceInMinutes(reservedDate, currDate) < 60 * 24) {
    return false; // time passed
  }
  return true;
}
