import { Groups } from "../utils/database/database.entities";
import {
  groupsTable,
  groupUsersTable,
  messagesTable,
} from "../utils/database/database.table.names";
import { supabaseClient } from "../utils/database/supabase.key";

export async function createChatGroup(group: Partial<Groups>) {
  const { error } = await supabaseClient.from(groupsTable).insert(group);

  if (error) {
    throw new Error(error.message);
  }
}

export async function joinChatGroup(user_id, group_id) {
  const { error } = await supabaseClient
    .from(groupUsersTable)
    .insert({ user_id, group_id });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getGroups() {
  const { data, error } = await supabaseClient
    .from(groupsTable)
    .select("*")
    .order("created_at");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function getChatForGroup(userId, groupId) {
  const { data, error } = await supabaseClient
    .from(messagesTable)
    .select("*")
    .eq("group_id", groupId)
    .order("created_at");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
