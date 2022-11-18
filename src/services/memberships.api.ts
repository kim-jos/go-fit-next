import { Memberships } from "../utils/database/database.entities";
import { membershipsTable } from "../utils/database/database.table.names";
import { supabaseClient } from "../utils/database/supabase.key";

export async function getMemberships(): Promise<Memberships[]> {
  let { data, error } = await supabaseClient
    .from<Memberships>(membershipsTable)
    .select("*")
    .order("price", { ascending: true });

  if (error) {
    throw new Error(`GET / ${membershipsTable} error: ${error.message}`);
  }

  return data;
}
