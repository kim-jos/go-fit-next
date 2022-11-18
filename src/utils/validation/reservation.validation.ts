export function isValidReservationDate(reservedDate: Date, time) {
  if (isReservationBeforeClass(reservedDate)) {
    return true;
  }
  // current time is not after reserved time + date
  return true;
}

function isReservationBeforeClass(reservedDate: Date) {
  // reservation: at least one hour before class
  const currDate = new Date(Date.now());
  if (reservedDate < currDate) {
    return false; // time passed
  }
  return true;
}
