import { ApolloClient, ApolloLink, createHttpLink, from, InMemoryCache } from '@apollo/client';

let serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const httpLink = createHttpLink({
    uri: serverUrl,
});

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("game-auth-token");

    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: token ? `${token}` : "",
        },
    }));

    return forward(operation);
});

const client = new ApolloClient({
    link: from([
        authLink,
        httpLink,
    ]),
    cache: new InMemoryCache(),
});

export default client;