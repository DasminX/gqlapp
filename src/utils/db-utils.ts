import { Model } from "mongoose";
import { UserType, PetType } from "./db";

type ModelType = Model<UserType | PetType>;
enum PetEnum {
  CAT,
  DOG,
  MOUSE,
  HAMSTER,
  SNAKE,
}

interface commonFieldsInput {
  name: String;
}

interface createPetInput extends commonFieldsInput {
  type: PetEnum;
  adopted: Boolean;
}

const getOne = (model: ModelType, id: String) => model.findOne({ _id: id });

const getAll = (model: ModelType, input = {}) => model.find(input);

const createOne = (
  model: ModelType,
  input: commonFieldsInput | createPetInput
) => model.create({ ...input });

export default { getOne, getAll, createOne };
