import { Model } from "mongoose";
import { UserType, PetType } from "./db";

enum PetEnum {
  CAT,
  DOG,
  MOUSE,
  HAMSTER,
  SNAKE,
}

interface commonFieldsCreateInput {
  name: String;
}

interface createPetInput extends commonFieldsCreateInput {
  type: PetEnum;
  adopted: Boolean;
}

const getAll = <T extends Model<UserType | PetType>>(model: T, input = {}) =>
  model.find(input);

const getOneById = <T extends Model<UserType | PetType>>(
  model: T,
  id: String
) => model.findOne({ _id: id });

const createOne = <T extends Model<UserType | PetType>>(
  model: T,
  input: T extends Model<UserType>
    ? commonFieldsCreateInput
    : T extends Model<PetType>
    ? createPetInput
    : never
) => {
  return model.create(input);
};

export default { getOneById, getAll, createOne };
