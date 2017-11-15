import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default new ApolloClient({
  link: new HttpLink({ uri: 'http://logs.ryanbigg.com/graphql'}),
  cache: new InMemoryCache()
});

