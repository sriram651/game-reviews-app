import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation LoginUser($userLogin: UserLoginInput!) {
        loginUser(userLogin: $userLogin) {
            token
            email
        }
    }
`;