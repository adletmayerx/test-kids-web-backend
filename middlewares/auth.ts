import jwt from "jsonwebtoken";
import NotAuthError from "../errors/NotAuthError";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("Bearer ", "");

  console.log(token);

  let payload;

  try {
    payload = jwt.verify(token, "super-strong-secret");

    //@ts-ignore
    req.user = payload;

    next();
  } catch (err: any) {
    console.log(err);
    throw new NotAuthError(err.message);
  }
};
