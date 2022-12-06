import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmail } from "../../../../src/services/auth.api";
import { usersTable } from "../../../../src/utils/database/database.table.names";
import { supabaseClient } from "../../../../src/utils/database/supabase.key";

const options = {
  // pages: {
  //   signIn: "/auth/signin",
  // },
  providers: [
    CredentialsProvider({
      name: "Go Fit",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email을 입력하세요",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "비밀번호을 입력하세요",
        },
      },

      async authorize(credentials, req) {
        console.log(credentials);
        const { user, session } = await signInWithEmail(credentials);
        const { data, error } = await supabaseClient
          .from(usersTable)
          .select("id, auth_id")
          .eq("auth_id", user.id);
        user["user_id"] = data[0].id;

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error("error message") // Redirect to error page
          // throw "/path/to/redirect"        // Redirect to a URL
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token, account }) => {
      if (user) {
        token.uid = user.id;
        token.user_id = user.user_id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
        session.user.accessToken = token.jti;
        session.user.user_id = token.user_id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

// @ts-ignore
const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;

// Google({
//   clientId: process.env.GOOGLE_ID,
//   clientSecret: process.env.GOOGLE_SECRET,
// }),
// Apple({
//   clientId: process.env.APPLE_ID,
//   clientSecret: process.env.APPLE_SECRET,
// }),
// Kakao({
//   clientId: process.env.KAKAO_ID,
//   clientSecret: process.env.KAKAO_SECRET,
// }),
