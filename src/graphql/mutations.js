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
            content
            downVotes
            upVotes
            rating
            score
            userVoteDetails {
                isVoted
                isDownVoted
                isUpVoted
            }
            createdAt
            user {
                userName
            }
            __typename
        }
    }
`;

export const UPVOTE_REVIEW = gql`
    mutation UpVoteReview($reviewId: ID!) {
        upVoteReview(reviewId: $reviewId)
    }
`;

export const DOWNVOTE_REVIEW = gql`
    mutation DownVoteReview($reviewId: ID!) {
        downVoteReview(reviewId: $reviewId)
    }
`;