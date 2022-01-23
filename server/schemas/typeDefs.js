const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBook: [Book]
  }

  type Book {
    _id: ID
    bookId: ID
    """"
    or bookID: String 
    """
    authors:[ { String } ]
    description: String 
    title: String 
    image: String 
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!) Auth 

    input saveBook(
    authors: [{ String }]!, 
    description: String!, 
    title: String!, 
    bookId: ID!,
    image: String!,
    link: String!
    ) User

    removeBook (bookId: ID!) User
  }

`;

module.exports = typeDefs;