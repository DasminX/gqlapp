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
                const isUser = yield dbFunctions.findOne(User, {
                    email: input.input.email,
                });
                if (isUser) {
                    throw new Error("Account with that email already exists!");
                }
                const newUser = yield dbFunctions.createOne(User, {
                    email: input.input.email,
                    password: hashPassword(input.input.password),
                });
                if (!newUser) {
                    throw new Error("Something went wrong! Try again.");
                }
                return "Registering successfull!"; // todo
            });
        },
        login(_, input, { User, dbFunctions, createToken, comparePasswordAndThrow }) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield dbFunctions.findOne(User, input.input.email);
                comparePasswordAndThrow(input.input.password, user.password);
                const token = createToken(user);
                return { user, token };
            });
        },
        createPet(_, input, { Pet, dbFunctions }) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield dbFunctions.createOne(Pet, input.input);
            });
        },
    },
    User: {
        pets(root, __, { Pet, dbFunctions }) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield dbFunctions.getAll(Pet, { owner: root._id });
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
