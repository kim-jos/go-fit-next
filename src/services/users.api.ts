import { Users } from "../utils/database/database.entities";
import { usersTable } from "../utils/database/database.table.names";
import { supabaseClient } from "../utils/database/supabase.key";

export async function getCurrUser(currUser): Promise<Users[]> {
  let { data, error } = await supabaseClient
    .from(usersTable)
    .select("*")
    .eq("id", currUser); // TODO: add logged in user instance

  if (error) throw new Error(`GET / ${usersTable} error: ${error.message}`);

  return data;
}

export async function createUser(data: Partial<Users>) {
  const { error } = await supabaseClient.from(usersTable).insert([
    // { data: "someValue", other_column: "otherValue" }
    data,
  ]);

  if (error) throw new Error(`POST / ${usersTable} error: ${error.message}`);

  return "User Created";
}
