// @ts-nocheck
import { ApolloServer } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import resolvers from "../src/resolvers";
import typeDefs from "../src/schema";

export const createServerTest = (ctx) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mockEntireSchema: false, // dont mock all resolvers - only those i dont use
    mocks: true, // ignore resolvers - mock them with random data
    context: () => ctx,
  });
  return createTestClient(server);
};
