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
    type: PetType!
    owner: User!
    adopted: Boolean!
  }

  input createUserInput {
    name: String!
  }

  input createPetInput {
    name: String!
    type: PetType!
    adopted: Boolean!
  }

  type Query {
    user(id: ID!): User
    users: [User]!
    pet(id: ID!): Pet
    pets: [Pet]!
  }

  type Mutation {
    createUser(input: createUserInput): User!
    createPet(input: createPetInput): Pet!
  }
`;
exports.default = typeDefs;
