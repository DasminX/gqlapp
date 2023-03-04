"use strict";
// @ts-nocheck
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
        createUser(_, input, { User, dbFunctions }) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield dbFunctions.createOne(User, input.input);
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
