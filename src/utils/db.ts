import { now, Schema, model } from "mongoose";

export interface UserType extends Document {
  name: String;
  createdAt: Date;
  pets: Array<typeof Pet>;
}

export interface PetType extends Document {
  name: String;
  age: Number;
  owner: String;
  type: String;
  adopted: Boolean;
}

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: now() },
  pets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
  ],
});

const petSchema = new Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, min: 0, max: 35 },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["CAT", "DOG", "MOUSE", "HAMSTER", "SNAKE"],
    required: true,
  },
  adopted: { type: Boolean, required: true },
});

export const User = model<UserType>("User", userSchema);
export const Pet = model<PetType>("Pet", petSchema);
