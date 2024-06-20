import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
  }),
  ssrMode: true,
});
