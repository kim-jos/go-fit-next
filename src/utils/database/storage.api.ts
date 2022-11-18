import { supabaseClient } from "./supabase.key";

export async function getStorageImage(folderName: string, imgAddress: string) {
  const { data, error } = await supabaseClient.storage
    .from(folderName)
    .download(imgAddress);
  if (error) throw new Error(`Storage Error: ${error}`);
  return data;
}
