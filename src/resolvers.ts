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
    async signup(_, input, { User, dbFunctions, hashPassword }) {
      const isUser = await dbFunctions.findOne(User, {
        email: input.input.email,
      });
      if (isUser) {
        throw new Error("Account with that email already exists!");
      }

      const newUser = await dbFunctions.createOne(User, {
        email: input.input.email,
        password: hashPassword(input.input.password),
      });

      if (!newUser) {
        throw new Error("Something went wrong! Try again.");
      }

      return "Registering successfull!"; // todo
    },
    async login(
      _,
      input,
      { User, dbFunctions, createToken, comparePasswordAndThrow }
    ) {
      const user = await dbFunctions.findOne(User, input.input.email);

      comparePasswordAndThrow(input.input.password, user.password);

      const token = createToken(user);
      return { user, token };
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
