import { AuthenticationError } from "apollo-server";
import { isTokenValid } from "./auth";

// type authorizeFnType = (cb: Function)

export const authenticated: any =
  (next: any) =>
  (root: any, args: any, context: any, info: any): any => {
    if (!isTokenValid(context.token)) {
      throw new AuthenticationError("Not logged in!");
    }

    return next(root, args, context, info);
  };
