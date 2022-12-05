import { supabaseClient } from "../utils/database/supabase.key";
import { Role } from "../utils/role.enum";
import { createUser } from "./users.api";

export async function signInWithEmail(existingUser) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: existingUser.email,
    password: existingUser.password,
  });

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function signUpWithEmail(newUser) {
  // name, phone, email, password

  const { data, error } = await supabaseClient.auth.signUp({
    email: newUser.email,
    password: newUser.password,
  });

  if (error) {
    throw new Error(`message: ${error.message}, status: ${error.cause}`);
  } else {
    await createUser({
      email: newUser.email,
      curr_credits: 0,
      phone_number: newUser.phone,
      name: newUser.name,
      auth_id: data.user.id,
      role: Role.MEMBER,
    });
  }

  return data;
}
