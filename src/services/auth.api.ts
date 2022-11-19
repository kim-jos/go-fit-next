import { Users } from "../utils/database/database.entities";
import { usersTable } from "../utils/database/database.table.names";
import { supabaseClient } from "../utils/database/supabase.key";
import { Role } from "../utils/role.enum";

export async function signInWithEmail(existingUser) {
  const { user, session, error } = await supabaseClient.auth.signIn({
    email: existingUser.email,
    password: existingUser.password,
  });
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return { user, session };
}

export async function signUpWithEmail(newUser) {
  // name, phone, email, password

  let { user, session, error } = await supabaseClient.auth.signUp({
    email: newUser.email,
    password: newUser.password,
  });

  if (error) {
    throw new Error(`message: ${error.message}, status: ${error.status}`);
  }

  const saveUser = new Users();
  saveUser.curr_credits = 0;
  saveUser.name = newUser.name;
  saveUser.email = newUser.email;
  saveUser.phone_number = newUser.phone;
  saveUser.role = Role.MEMBER;

  if (user) {
    let newUserError = await supabaseClient.from(usersTable).insert(saveUser);
    if (newUserError.error) {
      throw new Error(newUserError.error.message);
    }
  }
  console.log(`signup: ${session}, ${user.email}`);
  return session;
}

export async function isSignedIn(): Promise<boolean> {
  let session = await supabaseClient.auth.session();
  if (session) return true;
  return false;
}
