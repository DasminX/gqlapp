import { ApolloServer } from "apollo-server";
// import { AuthenticationoError, ApolloError, UserInputError } from "apollo-server";
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
      // formatError(e) {
      //   /* Trace bledow w konsoli */
      //   console.log(e);
      //   return new Error(e);
      // },
      context: ({ req }) => {
        const token =
          req?.headers?.authorization || req?.cookies?.jwtgql || "invalid";
        const currentUser = getUserFromToken(token);

        return {
          User,
          Pet,
          dbFunctions,
          createToken,
          comparePasswordAndThrow,
          hashPassword,
          token,
          currentUser,
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

/* Dyrektywy */

/* 
  SERVER SIDE
  @deprecated(reason?: String) - pole nie jest wspierane (daje tylko feedback do uzytkownika ale dalej trzeba zostawic resolvery i logike)
  
  CLIENT SIDE
  @include(if?: Boolean) - gdy przekazany argument do include->if jest prawdziwy to dolacz do response to pole przy ktorym jest @include
  @skip(if?: Boolean) - gdy przekazany argument do skip->if jest prawdziwy, to nie przekazuj tego pola do response

  /////////////////////////////////
  CUSTOM DIRECTIVES
  import SchemaDirectiveVisitor from 'apollo-server'; !!!
  import { defaultFieldResolver, GraphQLString } from 'graphql' !!!

  class LogDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field, type) {
      const resolver = field.resolve || defaultFieldResolver;
      const { message } = this.args;

      field.args.push({
        type: GraphQLString,
        name: "Message"
      })

      field.resolve = (root, {message, ...rest}, ctx, info) => {
        // DO SOMETHING THERE - LOG ex.
        return resolver.call(this, root, rest, ctx, info);
      }
    }

    visitedType() {
      ...
    }
  }

  gql`
    directive @log(message: String = "default message") on FIELD_DEFINITION (TYPE_DEFINITION)

    type WHATEVER {
      id: ID! @log("coś")
    }
  `
  
    const server = new ApolloServer({
      schemaDirectives: {
        log: LogDirective
      }
    });
  */
