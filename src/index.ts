import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";

import resolvers from "./resolvers";
import typeDefs from "./schema";
import { User, Pet } from "./utils/db";
import dbFunctions from "./utils/db-func";
import {
  getUserFromToken,
  createToken,
  comparePasswordAndThrow,
  hashPassword,
} from "./utils/auth";

dotenv.config();
const DB_URL = process.env.DB_URL_290602 as string;

mongoose
  .connect(DB_URL)
  .then(() => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        const token = req.headers.authorization as string;
        console.log(token);
        const currentUser = getUserFromToken(token);
        console.log(currentUser);
        return {
          User,
          Pet,
          dbFunctions,
          currentUser,
          createToken,
          comparePasswordAndThrow,
          hashPassword,
        };
      },
    });

    return server.listen();
  })
  .then(({ url }) => console.log(`Listening on ${url}`))
  .catch((err) => {
    console.error(err);
    console.log("exit gracefully");
    process.exit(1);
  });
