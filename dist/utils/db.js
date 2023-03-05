"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pet = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: (0, mongoose_1.now)() },
    pets: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Pet",
        },
    ],
});
const petSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    age: { type: Number, min: 0, max: 35 },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    type: {
        type: String,
        enum: ["CAT", "DOG", "MOUSE", "HAMSTER", "SNAKE"],
        required: true,
    },
    adopted: { type: Boolean, required: true },
});
exports.User = (0, mongoose_1.model)("User", userSchema);
exports.Pet = (0, mongoose_1.model)("Pet", petSchema);
