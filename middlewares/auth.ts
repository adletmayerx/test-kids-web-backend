import jwt from "jsonwebtoken";
import NotAuthError from "../errors/NotAuthError";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!token) {
    throw new NotAuthError("Авторизуйтесь, пожалуйста");
  }

  let payload;

  try {
    console.log(token)
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET ?? "super-strong-secret" : "super-strong-secret"
    );

    //@ts-ignore
    req.user = payload;

    next();
  } catch (err) {
    console.log(err);
    throw new NotAuthError("Авторизуйтесь, пожалуйста");
  }
};
