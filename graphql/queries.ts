import { gql } from "@apollo/client";

export const CHECK_IF_USER_EXISTS_BY_EMAIL = gql`
  query ($email: String!) {
    checkIfUserExistsByEmail(email: $email) {
      exists
    }
  }
`;

export const CHECK_IF_USER_EXISTS_BY_NICKNAME = gql`
  query ($nickname: String!) {
    checkIfUserExistsByNickname(nickname: $nickname) {
      exists
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation ($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      accessToken
      refreshToken
    }
  }
`;

export const LOGIN_WITH_EMAIL_QUERY = gql`
  query ($email: String!, $password: String!) {
    loginWithEmail(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const REFRESH_TOKENS_QUERY = gql`
  query {
    refreshTokens {
      accessToken
      refreshToken
    }
  }
`;

export const GET_MY_PROFILE_QUERY = gql`
  query {
    getMyProfile {
      id
      bio
      birthday
      createdAt
      email
      firstName
      lastName
      nickname
      sex
      profileImage
      followers {
        id
        firstName
        lastName
        profileImage
        nickname
        __typename
      }
      following {
        id
        firstName
        lastName
        profileImage
        nickname
        __typename
      }
      posts {
        id
        postImage
        caption
        likes {
          userId
        }
        location
        __typename
      }
      __typename
    }
  }
`;
