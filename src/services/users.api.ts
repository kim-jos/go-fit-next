import { Users } from "../utils/database/database.entities";
import { usersTable } from "../utils/database/database.table.names";
import { supabaseClient } from "../utils/database/supabase.key";

export async function createUser(data: Partial<Users>) {
  const { error } = await supabaseClient.from(usersTable).insert(data);

  if (error) throw new Error(`POST / ${usersTable} error: ${error.message}`);

  return error;
}

export async function getUserCredits(userId: number) {
  const { data, error } = await supabaseClient
    .from(usersTable)
    .select("curr_credits, id")
    .eq("id", userId);

  if (error) throw new Error(`${error.message}`);

  return data[0];
}
