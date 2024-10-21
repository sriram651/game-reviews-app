import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation LoginUser($userLogin: UserLoginInput!) {
        loginUser(userLogin: $userLogin) {
            token
            email
        }
    }
`;

export const ADD_REVIEW = gql`
    mutation AddReview($gameId: ID!, $review: NewReviewInput!) {
        addReview(gameId: $gameId, review: $review) {
            _id
        }
    }
`;