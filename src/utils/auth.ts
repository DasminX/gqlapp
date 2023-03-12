import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.SECRET_JWT_TOKEN as string;

type tokenObjectType = {
  id: string;
  name: string;
};

export const createToken = (tokenObject: tokenObjectType) =>
  jwt.sign(tokenObject, secret);

export const getUserFromToken = (token: string) => {
  try {
    const user = jwt.verify(token, secret);
    if (typeof user === "object" && user != null) {
      return user;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const isTokenValid = (token: string) => {
  const tokenObject = jwt.verify(token, secret);
  if (
    typeof tokenObject === "object" &&
    "id" in tokenObject &&
    "name" in tokenObject
  )
    return true;
  return false;
};

export const comparePasswordAndThrow = (
  incomingPassword: string,
  dbPassword: string
) => {
  if (!bcrypt.compare(incomingPassword, dbPassword)) {
    throw new Error("Wrong login or password!");
  }
};

export const hashPassword = (incomingPassword: string) =>
  bcrypt.hash(incomingPassword, 14);
