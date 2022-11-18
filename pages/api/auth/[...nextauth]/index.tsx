import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import { supabaseClient } from "../../../../src/utils/database/supabase.key";

const options = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Apple({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    Kakao({
      //Naver
      clientId: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Go-fit account",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "email을 입력하세요",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };
        let { user, session, error } = await supabaseClient.auth.signIn({
          email: credentials?.username,
          password: credentials?.password,
        });
        console.log(user);
        console.log(session);
        user["name"] = session.access_token;
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
};

// @ts-ignore
const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
