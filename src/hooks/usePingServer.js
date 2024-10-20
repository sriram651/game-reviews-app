import { PING_SERVER } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

export default function usePingServer() {
    const { data, error } = useQuery(PING_SERVER, {}, { fetchPolicy: "no-cache", nextFetchPolicy: "no-cache" });

    return { data, error };
}