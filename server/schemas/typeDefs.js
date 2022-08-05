const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    bookId: ID!
    authors: String!
    description: String!
    title: String!
    image:  String!
    link:  String!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: int!
    savedBooks: [Book]
  }
  input savedBook {
    bookId: ID!
    authors: String!
    description: String!
    title: String!
    image:  String!
    link:  String!
  }
  type Auth {
    token: Id!
    user: User
  }
  type Query {
    me: User
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    login(username: String!, email: String!, password: String!): Auth
    saveBook(input: savedBook!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
