"use client";

import { client } from "@/lib/client";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <ChakraProvider>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </ChakraProvider>
    </SessionProvider>
  );
};
