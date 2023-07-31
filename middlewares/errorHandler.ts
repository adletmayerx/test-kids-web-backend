import server from "../errors/constants";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

module.exports = (e: any, req: Request, res: Response, next: NextFunction) => {
  console.log(e.statusCode);
  const statusCode = e.statusCode || server;
  const message = statusCode === server ? "Произошла ошибка" : e.message;
  res.status(statusCode).send({ message });
  
  next();
};
