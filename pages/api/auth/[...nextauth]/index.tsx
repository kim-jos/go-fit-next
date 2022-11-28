import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmail } from "../../../../src/services/auth.api";

const options = {
  // pages: {
  //   signIn: "/auth/signin",
  // },
  providers: [
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
    CredentialsProvider({
      name: "Go Fit",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Email을 입력하세요",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "비밀번호을 입력하세요",
        },
      },

      async authorize(credentials, req) {
        const { user, session } = await signInWithEmail(credentials);
        user["access_token"] = session.access_token;
        console.log("login user: ", user);
        console.log("login session: ", session);
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
