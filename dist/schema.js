"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const typeDefs = (0, graphql_tag_1.default) `
  type User {
    id: ID!
    name: String!
    createdAt: String!
    pets: [Pet]!
  }

  enum PetType {
    CAT
    DOG
    MOUSE
    HAMSTER
    SNAKE
  }

  type Pet {
    id: ID!
    name: String!
    age: Int!
    type: PetType!
    owner: User!
    adopted: Boolean!
  }

  input createPetInput {
    name: String!
    age: Int!
    type: PetType!
    adopted: Boolean!
    owner: ID!
  }

  input authSignupInput {
    email: String!
    name: String!
    password: String!
  }

  input authLoginInput {
    email: String!
    password: String!
  }

  type authUser {
    token: String!
    user: User!
  }

  type Query {
    user(id: ID!): User
    users: [User]!
    pet(id: ID!): Pet
    pets: [Pet]!
  }

  type Mutation {
    createPet(input: createPetInput): Pet!
    signup(input: authSignupInput): String!
    login(input: authLoginInput): authUser!
  }
`;
exports.default = typeDefs;
