import { differenceInHours } from "date-fns";

export function isValidCancelation(reservedDate: Date, time) {
  if (!isCancelationTheDayBefore(reservedDate)) {
    return false;
  }
  return true;
}

function isCancelationTheDayBefore(reservedDate) {
  const cancelationTime = new Date(Date.now());

  // reservation: at least 24 hour before class
  if (differenceInHours(reservedDate, cancelationTime) < 24) {
    return false; // time passed
  }
  return true;
}
