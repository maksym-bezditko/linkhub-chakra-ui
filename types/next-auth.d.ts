import NextAuth from "next-auth";
import { GetMyProfileResponse, TokensResponse } from "./responses";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    bio: string | null;
    firstName: string;
    lastName: string;
    sex: Sex;
    birthday: Date;
    nickname: string;
    createdAt: Date;
    profileImage: string | null;
    tokens: TokensResponse
  }

  interface Session {
    user: User
  }

  interface JWT {
    id: number;
    email: string;
    bio: string | null;
    firstName: string;
    lastName: string;
    sex: Sex;
    birthday: Date;
    nickname: string;
    createdAt: Date;
    profileImage: string | null;
    tokens: TokensResponse
  }
}
