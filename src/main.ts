import { createApp, provide, h } from 'vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import { isApolloError } from '@apollo/client/errors'


// 1. Configure the HTTP Link to your GraphQL API
const httpLink = createHttpLink({
  uri: 'https://your-graphql-endpoint.com', 
})

// 2. Cache implementation
const cache = new InMemoryCache()

// 3. Create the Apollo Client instance
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

// 4. Create the Vue app and provide the client inside setup()
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.mount('#app')
