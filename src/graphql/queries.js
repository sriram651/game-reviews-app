import { gql } from "@apollo/client";

export const PING_SERVER = gql`
    query Ping {
        pingServer {
            message
            success
        }
    }
`;

export const GET_ALL_GAMES = gql`
    query GetAllGames {
        getAllGames {
            _id
            title
            releasedYear
            genre
            coverImage
            platform
            reviews {
                _id
            }
        }
    }
`;

export const GET_GAME_BY_ID = gql`
    query GetGameById($gameId: ID!) {
        getGameById(id: $gameId) {
            _id
            title
            description
            coverImage
            createdAt
            genre
            platform
            releasedYear
            releaseDate
            manufacturerName
            developer
        }
    }
`;