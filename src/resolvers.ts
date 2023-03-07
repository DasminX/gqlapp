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
      const isUser = await dbFunctions.getOneByParams(User, {
        email: input.input.email,
      });

      if (isUser) {
        throw new Error("Account with that email already exists!");
      }

      const newUser = await dbFunctions.createOne(User, {
        email: input.input.email,
        name: input.input.name,
        password: await hashPassword(input.input.password),
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
      const user = await dbFunctions.getOneByParams(User, {
        email: input.input.email,
      });

      if (!user) {
        throw new Error("User with that email does not exist!");
      }

      await comparePasswordAndThrow(input.input.password, user.password);

      const token = createToken({ id: user._id, name: user.name });
      console.log(token);

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
