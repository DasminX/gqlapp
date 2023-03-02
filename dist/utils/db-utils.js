"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PetEnum;
(function (PetEnum) {
    PetEnum[PetEnum["CAT"] = 0] = "CAT";
    PetEnum[PetEnum["DOG"] = 1] = "DOG";
    PetEnum[PetEnum["MOUSE"] = 2] = "MOUSE";
    PetEnum[PetEnum["HAMSTER"] = 3] = "HAMSTER";
    PetEnum[PetEnum["SNAKE"] = 4] = "SNAKE";
})(PetEnum || (PetEnum = {}));
const getOne = (model, id) => model.findOne({ _id: id });
const getAll = (model, input = {}) => model.find(input);
const createOne = (model, input) => model.create(Object.assign({}, input));
exports.default = { getOne, getAll, createOne };
