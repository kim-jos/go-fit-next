import { differenceInMinutes } from "date-fns";
import { ReservationTransactions } from "../database/database.entities";
import { classAvailabilityTable } from "../database/database.table.names";
import { supabaseClient } from "../database/supabase.key";

export async function isInvalidCancelation(
  reservation: ReservationTransactions
) {
  const currDate = new Date(Date.now());

  const { data, error } = await supabaseClient
    .from(classAvailabilityTable)
    .select("time, id")
    .eq("id", reservation.class_time);

  if (error) {
    throw new Error(error.message);
  }

  const { time } = data[0];
  const hours = time.toString().split(":");
  const date = new Date(reservation.reservation_date);

  date.setHours(Number(hours[0]), Number(hours[1]), Number(hours[2]));
  const validTime = differenceInMinutes(date, currDate) >= 60 * 24;

  if (validTime) return false; // it is a valid time;
  return true; // it is a invalid time
}
