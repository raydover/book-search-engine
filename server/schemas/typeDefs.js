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
    password: String!
    bookCount: int!
    savedBooks: [bookSchema]
  }
  type Auth{
    token:
    user: 
  }
  type Query {
    me: User
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(description: String!, title: String!, bookId: Int!, image: , link: String! ): User
    removeBook(): User
  }
`;

module.exports = typeDefs;
