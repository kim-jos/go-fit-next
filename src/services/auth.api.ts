import { Users } from "../utils/database/database.entities";
import { usersTable } from "../utils/database/database.table.names";
import { supabaseClient } from "../utils/database/supabase.key";
import { Role } from "../utils/role.enum";

export async function signInWithEmail(existingUser) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: existingUser.email,
    password: existingUser.password,
  });
  console.log("sign in: ", data);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}

export async function signUpWithEmail(newUser) {
  // name, phone, email, password

  let { data, error } = await supabaseClient.auth.signUp({
    email: newUser.email,
    password: newUser.password,
  });

  if (error) {
    throw new Error(`message: ${error.message}, status: ${error.cause}`);
  } else {
    const saveUser = new Users();
    saveUser.curr_credits = 0;
    saveUser.name = newUser.name;
    saveUser.email = newUser.email;
    saveUser.phone_number = newUser.phone;
    saveUser.role = Role.MEMBER;

    let newUserError = await supabaseClient.from(usersTable).insert(saveUser);
    if (newUserError.error) {
      throw new Error(newUserError.error.message);
    }
  }

  return data;
}

export async function isSignedIn(): Promise<boolean> {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (user) return true;
  return false;
}
