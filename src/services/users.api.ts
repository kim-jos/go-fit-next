import { Users } from "../utils/database/database.entities";
import { usersTable } from "../utils/database/database.table.names";
import { supabaseClient } from "../utils/database/supabase.key";

export async function createUser(data: Partial<Users>) {
  const { error } = await supabaseClient.from(usersTable).insert(data);

  if (error) throw new Error(`POST / ${usersTable} error: ${error.message}`);

  return error;
}
