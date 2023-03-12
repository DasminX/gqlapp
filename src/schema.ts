import gql from "graphql-tag";

// import pubsub from ApolloServer
// const pubSub = new PubSub()

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
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
    # createPost(content: String!): Post
  }

  # subskrypcje

  # type Post {
  #   content: String!
  # }

  # type Subscription {
  #   newPost: Post!
  # }
`;

export default typeDefs;
