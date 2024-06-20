import {
  LOGIN_WITH_EMAIL_QUERY,
  GET_MY_PROFILE_QUERY,
} from "@/graphql/queries";
import {
  LoginWithEmailResponse,
  LoginWithEmailVariables,
  GetMyProfileResponse,
} from "@/types/responses";
import { NextAuthOptions, User } from "next-auth";
import { client } from "./client";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await client.query<
            LoginWithEmailResponse,
            LoginWithEmailVariables
          >({
            query: LOGIN_WITH_EMAIL_QUERY,
            variables: {
              email: credentials?.email || "",
              password: credentials?.password || "",
            },
          });

          if (
            !res.data?.loginWithEmail ||
            !res.data?.loginWithEmail.accessToken ||
            !res.data?.loginWithEmail.refreshToken
          ) {
            return null;
          }

          const myProfileResponse = await client.query<GetMyProfileResponse>({
            query: GET_MY_PROFILE_QUERY,
            context: {
              headers: {
                authorization: `Bearer ${res.data.loginWithEmail.accessToken}`,
              },
            },
          });

          const profile = myProfileResponse.data?.getMyProfile;

          if (!profile) {
            return null;
          }

          if (res.data?.loginWithEmail) {
            return { ...profile, tokens: res.data.loginWithEmail };
          }

          return null;
        } catch (e) {
          console.log(e);

          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
};
