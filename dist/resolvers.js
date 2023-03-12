"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const protect_func_1 = require("./utils/protect-func");
const resolvers = {
    Query: {
        user(_, input, { User, dbFunctions }) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield dbFunctions.getOneById(User, input.id);
            });
        },
        users(_, __, { User, dbFunctions }) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield dbFunctions.getAll(User);
            });
        },
        pet(_, input, { Pet, dbFunctions }) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield dbFunctions.getOneById(Pet, input.id);
            });
        },
        pets(_, __, { Pet, dbFunctions }) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield dbFunctions.getAll(Pet);
            });
        },
    },
    Mutation: {
        signup(_, input, { User, dbFunctions, hashPassword }) {
            return __awaiter(this, void 0, void 0, function* () {
                const isUser = yield dbFunctions.getOneByParams(User, {
                    email: input.input.email,
                });
                if (isUser) {
                    throw new Error("Account with that email already exists!");
                }
                const newUser = yield dbFunctions.createOne(User, {
                    email: input.input.email,
                    name: input.input.name,
                    password: yield hashPassword(input.input.password),
                });
                if (!newUser) {
                    throw new Error("Something went wrong! Try again.");
                }
                return "Registering successfull!"; // todo
            });
        },
        login(_, input, { User, dbFunctions, createToken, comparePasswordAndThrow }) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield dbFunctions.getOneByParams(User, {
                    email: input.input.email,
                });
                if (!user) {
                    throw new Error("User with that email does not exist!");
                }
                yield comparePasswordAndThrow(input.input.password, user.password);
                const token = createToken({ id: user._id, name: user.name });
                return { user, token };
            });
        },
        createPet: (0, protect_func_1.authenticated)((_, input, { Pet, dbFunctions, currentUser }, __) => __awaiter(void 0, void 0, void 0, function* () {
            return yield dbFunctions.createOne(Pet, Object.assign(Object.assign({}, input.input), { owner: currentUser.id }));
        })),
    },
    User: {
        pets(root, __, { Pet, dbFunctions }) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield dbFunctions.getAll(Pet, { owner: root.id });
            });
        },
    },
    Pet: {
        owner(root, __, { User, dbFunctions }) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield dbFunctions.getOneById(User, root.owner);
            });
        },
    },
};
exports.default = resolvers;
