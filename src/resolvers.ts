// @ts-nocheck

const resolvers = {
  Query: {
    async user(_, input, { User, dbFunctions }) {
      return await dbFunctions.getOneById(User, input.id);
    },
    async users(_, __, { User, dbFunctions }) {
      return await dbFunctions.getAll(User);
    },
    async pet(_, input, { Pet, dbFunctions }) {
      return await dbFunctions.getOneById(Pet, input.id);
    },
    async pets(_, __, { Pet, dbFunctions }) {
      return await dbFunctions.getAll(Pet);
    },
  },
  Mutation: {
    async createUser(_, input, { User, dbFunctions }) {
      return await dbFunctions.createOne(User, input.input);
    },
    async createPet(_, input, { Pet, dbFunctions }) {
      return await dbFunctions.createOne(Pet, input.input);
    },
  },
  User: {
    async pets(root, __, { Pet, dbFunctions }) {
      return await dbFunctions.getAll(Pet, { owner: root._id });
    },
  },
  Pet: {
    async owner(root, __, { User, dbFunctions }) {
      return await dbFunctions.getOneById(User, root.owner);
    },
  },
};

export default resolvers;
