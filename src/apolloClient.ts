import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'

// Defaults to a public demo API so the example works out of the box.
// Override with VITE_GRAPHQL_URL in a .env file.
const uri = import.meta.env.VITE_GRAPHQL_URL ?? 'https://countries.trevorblades.com/graphql'

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache(),
})
