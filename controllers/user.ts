import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";
import { ConflictError, ForbiddenError, NotAuthError, ValidationError, NotFoundError } from "../errors";
import { Request, Response, NextFunction } from "express";

const { NODE_ENV, JWT_SECRET } = process.env;

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  User.findById(req.user._id)
    .orFail(new NotFoundError("Пользователь по указанному _id не найден"))
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.name === "CastError") {
        next(new ValidationError(e.message));
      } else {
        next(e);
      }
    })
    .catch(next);
};

export const updateFeedback = (req: Request, res: Response, next: NextFunction) => {
  const { feedback } = req.body;

  User.findByIdAndUpdate(
  //@ts-ignore
    req.user._id,
    { feedback },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(new NotFoundError("Пользователь по указанному _id не найден"))
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.name === "CastError") {
        next(new ValidationError(e.message));
      } else {
        next(e);
      }
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError("Пользователь с таким email уже существует");
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => {
      User.create({
        email,
        password: hash,
      })
        .then(() => {
          res.status(200).send({
            data: {
              email,
            },
          });
        })
        .catch(next);
    })
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new NotAuthError("Неправильные логин или пароль");
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new NotAuthError("Неверный пароль");
        }

        return user;
      });
    })
    .then((user) => {
      const token = jsonwebtoken.sign(
        {
          _id: user._id,
        },
        NODE_ENV === "production" ? JWT_SECRET ?? "super-strong-secret" : "super-strong-secret",
        {
          expiresIn: "7d",
        }
      );

      res
        .cookie("jwt", token, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
          sameSite: "none",
          secure: true,
        })
        .send({ message: "Логин успешный" });
    })
    .catch(next);
};

export const getUserInfo = (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

export const signOut = (req: Request, res: Response) => {
  res.cookie("jwt", { httpOnly: true,
    maxAge: 0,
    sameSite: "none",
    secure: true, }).send({ message: "cookies deleted" });
};
