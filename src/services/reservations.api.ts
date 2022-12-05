import { ReservationTransactions } from "../utils/database/database.entities";
import {
  classesTable,
  reservationTransactionTable,
  usersTable,
} from "../utils/database/database.table.names";
import { supabaseClient } from "../utils/database/supabase.key";

export async function getUserReservations(
  currUser
): Promise<ReservationTransactions[]> {
  const { data, error } = await supabaseClient
    .from(reservationTransactionTable)
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

export async function getReservations(): Promise<ReservationTransactions[]> {
  const currDate = new Date(Date.now());
  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() + 6);

  const { data, error } = await supabaseClient
    .from(reservationTransactionTable)
    .select(
      `
    *,
    class:class_id(name),
    classAvailability:class_time(weekday, time),
    user:user_id(name)
  `
    )
    .gte("reservation_date", currDate.toISOString())
    .lt("reservation_date", thisWeek.toISOString());

  if (error) {
    throw new Error(
      `GET / ${reservationTransactionTable} error: ${error.message}`
    );
  }

  return data;
}

export async function cancelReservation(reservation: ReservationTransactions) {
  // add credits
  const { id, user_id, class_id } = reservation;

  const user = await supabaseClient
    .from(usersTable)
    .select(`curr_credits, id`)
    .eq("id", user_id);

  if (user.error) {
    throw new Error(user.error.message);
  }

  const gym = await supabaseClient
    .from(classesTable)
    .select(`credits_required, id`)
    .eq("id", class_id);

  if (gym.error) {
    throw new Error(gym.error.message);
  }

  const userCredits = user.data[0].curr_credits;
  const gymRequiredCredits = gym.data[0].credits_required;
  const updatedCredits = userCredits + gymRequiredCredits;

  const userUpdated = await supabaseClient
    .from(usersTable)
    .update({ curr_credits: updatedCredits })
    .eq("id", user_id);

  if (userUpdated.error) {
    throw new Error(userUpdated.error.message);
  }

  // update reservation transaction status
  const { error } = await supabaseClient
    .from(reservationTransactionTable)
    .update({ status: 1 })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return "cancelation successful";
}

export async function createReservation(
  data: Partial<ReservationTransactions>
) {
  await subtractCredits(data.user_id, data.class_id);

  const { error } = await supabaseClient
    .from(reservationTransactionTable)
    .insert(data);

  if (error) {
    throw new Error(
      `POST / ${reservationTransactionTable} error: ${error.message}`
    );
  }

  console.log("created reservation");

  return "Reservation Successful";
}

export async function subtractCredits(userId: number, classId: number) {
  const userData = await supabaseClient
    .from(usersTable)
    .select("curr_credits, id")
    .eq("id", userId);

  const classData = await supabaseClient
    .from(classesTable)
    .select("credits_required, id")
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

  const userCredits = user[0].curr_credits;
  const creditsRequired = classInstance[0].credits_required;
  if (userCredits < creditsRequired) {
    throw new Error("Not Enough Credits");
  }

  const remainingCredits = userCredits - creditsRequired;
  let updated = await supabaseClient
    .from(usersTable)
    .update({ curr_credits: remainingCredits })
    .eq("id", userId);

  if (updated.error) {
    throw new Error(updated.error.message);
  }
  return updated.error;
}

export async function addCredits(userId: number, classId: number) {}
