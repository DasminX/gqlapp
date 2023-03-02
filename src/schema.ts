import gql from "graphql-tag";
const typeDefs = gql`
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

export default typeDefs;
