import { differenceInMinutes } from "date-fns";
import { ClassAvailability } from "../database/database.entities";

export function isValidReservationDate(
  reservedDate: Date,
  time: ClassAvailability
) {
  const currDate = new Date(Date.now());
  const hours = time.time.toString().split(":");
  reservedDate.setHours(Number(hours[0]), Number(hours[1]), Number(hours[2]));

  const timePassed = differenceInMinutes(reservedDate, currDate) < 60 * 6;
  if (timePassed) return false;

  // current time is not after reserved time + date
  return true;
}
