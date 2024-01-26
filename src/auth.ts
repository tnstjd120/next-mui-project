import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log("\x1b[31m", "auth.ts - jwt token => ", token);
      console.log("\x1b[31m", "auth.ts - jwt user => ", user);

      if (user) {
        const cookieStore = cookies();
        cookieStore.set("accessToken", user.accessToken as string);
        cookieStore.set("refreshToken", user.refreshToken as string);

        token.user = {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          userId: user.userId,
          userName: user.userName,
          // profileImage: user.profileImage,
          isFirstLogin: user.isFirstLogin,
          success: user.success,
          code: user.code,
          message: user.message,
        };
      }

      return token;
    },
    session: async ({ session, ...rest }) => {
      if ("token" in rest) {
        const { token } = rest;

        if (session.user) session.user = token.user as User;
      }

      console.log(
        "\x1b[32m",
        "----------------------- callbacks session Start -----------------------"
      );
      console.log("auth.ts - session =>", session);

      console.log(
        "\x1b[32m",
        "----------------------- callbacks session End -----------------------"
      );
      return session;
    },
  },
  events: {
    signOut(data) {
      console.log(
        "\x1b[31m",
        "----------------------- events signOut Start -----------------------"
      );
      console.log(data);
      cookies().delete("accessToken");
      cookies().delete("refreshToken");
      console.log(
        "\x1b[31m",
        "----------------------- events signOut End -----------------------"
      );
    },
    session(data) {
      console.log(
        "\x1b[31m",
        "----------------------- events session Start -----------------------"
      );
      console.log(data);
      delete data.session.user?.message;
      delete data.session.user?.success;
      delete data.session.user?.code;
      console.log(
        "\x1b[31m",
        "----------------------- events session End -----------------------"
      );
    },
  },
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const { userId, userPassword } = credentials;

        const authResponse = await fetch(
          `${process.env.AUTH_URL}/api/users/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              userPassword: userPassword,
            }),
          }
        );

        console.log("authResponse ==> ", authResponse);
        console.log("authResponse.ok ==> ", authResponse.ok);

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();

        console.log("USER =>", user);

        return user;
      },
    }),
  ],
});
