const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID!
    name: String!
    authors: String!
    description: String!
    bookId: String!
    image:  String!
    link:  String!
    title:  String!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [bookSchema]
  }
  type Query {
    me: User
  }

  type Mutation {
    createUser(): User
    login(email: String!, password:String!): Auth
    saveBook(): User
    deleteBook(): User
  }
`;

module.exports = typeDefs;
