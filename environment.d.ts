import Next from "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      JWT_SECRET: string;
    }
  }
}