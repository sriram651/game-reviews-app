import { ApolloClient, InMemoryCache } from '@apollo/client';

let serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const client = new ApolloClient({
    uri: serverUrl,
    cache: new InMemoryCache(),
});

export default client;