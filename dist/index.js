"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const resolvers_1 = __importDefault(require("./resolvers"));
const schema_1 = __importDefault(require("./schema"));
const db_1 = require("./utils/db");
const db_func_1 = __importDefault(require("./utils/db-func"));
dotenv_1.default.config();
const DB_URL = process.env.DB_URL_290602;
mongoose_1.default
    .connect(DB_URL)
    .then(() => {
    const server = new apollo_server_1.ApolloServer({
        typeDefs: schema_1.default,
        resolvers: resolvers_1.default,
        context: () => {
            return { User: db_1.User, Pet: db_1.Pet, dbFunctions: db_func_1.default };
        },
    });
    return server.listen();
})
    .then(({ url }) => console.log(`Listening on ${url}`))
    .catch((err) => {
    console.log(err);
    console.log("exit gracefully");
    process.exit(1);
});
