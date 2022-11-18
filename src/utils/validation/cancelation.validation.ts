export function isValidCancelation(reservedDate: Date, time) {
  if (isCancelationOneDayBefore()) {
    return true;
  }
  // current time is not after reserved time + date
  return true;
}

function isCancelationOneDayBefore() {
  return true;
}
