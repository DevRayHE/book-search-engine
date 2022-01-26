import { gql } from '@appolo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id 
        username 
      }
    }
  }
`;

export const SAVE_BOOOK = gql`
  mutation saveBook($bookData: bookInput!) {
    saveBook(bookData: $bookData) {
      user {
        _id
        username
        email
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: bookId!) {
    removeBook(bookId: $bookId) {
      user {
        _id
        username
        email
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
`;