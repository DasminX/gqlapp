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
const auth_1 = require("./utils/auth");
dotenv_1.default.config();
const DB_URL = process.env.DB_URL_290602;
mongoose_1.default
    .connect(DB_URL)
    .then(() => {
    const server = new apollo_server_1.ApolloServer({
        typeDefs: schema_1.default,
        resolvers: resolvers_1.default,
        context: ({ req }) => {
            var _a, _b;
            const token = ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || ((_b = req === null || req === void 0 ? void 0 : req.cookies) === null || _b === void 0 ? void 0 : _b.jwtgql) || "invalid";
            const currentUser = (0, auth_1.getUserFromToken)(token);
            return {
                User: db_1.User,
                Pet: db_1.Pet,
                dbFunctions: db_func_1.default,
                createToken: auth_1.createToken,
                comparePasswordAndThrow: auth_1.comparePasswordAndThrow,
                hashPassword: auth_1.hashPassword,
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
