import {
  classesTable,
  reservationTransactionTable,
  usersTable,
} from "../utils/database.table.names";
import {
  Classes,
  ReservationTransactions,
  Users,
} from "../utils/database/database.entities";
import { supabaseClient } from "../utils/supabase.key";

export async function getUserReservations(
  currUser
): Promise<ReservationTransactions[]> {
  const { data, error } = await supabaseClient
    .from<ReservationTransactions>(reservationTransactionTable)
    .select("*")
    .eq("user_id", currUser) // TODO: add logged in user instance
    .order("reservation_date", { ascending: true });

  if (error) {
    throw new Error(
      `GET / ${reservationTransactionTable} error: ${error.message}`
    );
  }

  return data;
}

export async function createReservation(
  data: Partial<ReservationTransactions>,
  currUser
) {
  const notEnoughCredits = await insufficientCredits(
    currUser,
    data.class_id.id
  );
  if (notEnoughCredits) {
    // TODO: add user id
    return "Not Enough Credits";
  }

  const { error } = await supabaseClient
    .from(reservationTransactionTable)
    .insert([
      // { data: "someValue", other_column: "otherValue" }
      data,
    ]);

  if (error) {
    throw new Error(
      `POST / ${reservationTransactionTable} error: ${error.message}`
    );
  }

  return "Reservation Successful";
}

export async function insufficientCredits(
  userId: number,
  classId: number
): Promise<boolean> {
  const userData = await supabaseClient
    .from<Users>(usersTable)
    .select("*")
    .eq("id", userId);

  const classData = await supabaseClient
    .from<Classes>(classesTable)
    .select("*")
    .eq("id", classId);

  const user = userData.data;
  const userError = userData.error;
  const classInstance = classData.data;
  const classError = classData.error;

  if (userError) {
    throw new Error(
      `GET / ${usersTable} error: ${userError.message} get credits error`
    );
  }

  if (classError) {
    throw new Error(
      `GET / ${classesTable} error: ${classError.message} get credits error`
    );
  }

  if (user[0].curr_credits < classInstance[0].credits_required) {
    return true;
  }
  return false;
}
