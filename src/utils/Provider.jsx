"use client";

import client from "@/graphql/apolloClient";
import { ApolloProvider } from "@apollo/client";

export default function Provider({ children }) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}
