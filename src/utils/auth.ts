import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret = process.env.SECRET_JWT_TOKEN as string;

type tokenObjectType = {
  id: string;
  name: string;
};

export const createToken = (tokenObject: tokenObjectType) =>
  jwt.sign(tokenObject, secret);

export const getUserFromToken = (token: string) => {
  const user = jwt.verify(token, secret);

  if (typeof user === "object" && user != null) {
    return user;
  }

  return null;
};

export const comparePasswordAndThrow = async (
  incomingPassword: string,
  dbPassword: string
) => {
  if (!(await bcrypt.compare(incomingPassword, dbPassword))) {
    throw new Error("Wrong login or password!");
  }
};

export const hashPassword = async (incomingPassword: string) =>
  await bcrypt.hash(incomingPassword, 14);
