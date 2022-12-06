import {
  ClassAvailability,
  Classes,
} from "../utils/database/database.entities";
import {
  classAvailabilityTable,
  classesImagesTable,
  classesTable,
} from "../utils/database/database.table.names";
import { supabaseClient } from "../utils/database/supabase.key";

export async function getClassesList(): Promise<Classes[]> {
  let { data, error } = await supabaseClient
    .from(classesTable)
    .select("*")
    .order("priority", { ascending: true })
    .filter("hide_class", "eq", false);

  if (error) throw new Error(`GET / ${classesTable} error: ${error.message}`);
  if (!data?.length) throw new Error("Data is empty");
  return data;
}

export async function getClass(id: number): Promise<Classes> {
  let { data, error } = await supabaseClient
    .from(classesTable)
    .select("*")
    .eq("id", id);

  if (error) throw new Error(`GET / ${classesTable} error: ${error.message}`);
  if (!data?.length) throw new Error("Data is empty");
  return data[0];
}

export async function getClassImages(classId: number) {
  let { data, error } = await supabaseClient
    .from(classesImagesTable)
    .select("url")
    .eq("class_id", classId);

  if (error)
    throw new Error(`GET / ${classesImagesTable} error: ${error.message}`);
  return data;
}

export async function getClassAvailability(
  classId: number,
  weekday: number
): Promise<Partial<ClassAvailability>[]> {
  let { data, error } = await supabaseClient
    .from(classAvailabilityTable)
    .select("time, info, id")
    .eq("class_id", classId)
    .eq("weekday", weekday)
    .order("time", { ascending: true });

  if (error) {
    throw new Error(`GET / ${classAvailabilityTable} error: ${error.message}`);
  }
  if (!data?.length) console.log("Data is empty");
  return data;
}
