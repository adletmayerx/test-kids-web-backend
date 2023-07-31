import { celebrate, CelebrateError, Joi } from "celebrate";
import validator from "validator";

export const userIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

export const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value: string) => {
        if (!validator.isEmail(value)) {
          throw new CelebrateError("Введен некорректный email");
        }
        return value;
      }),
    password: Joi.string().required(),
  }),
});

export const userValidation = celebrate({
  body: Joi.object().keys({
    feedback: Joi.string().min(2).max(30),
    email: Joi.string()
      .required()
      .custom((value: string) => {
        if (!validator.isEmail(value)) {
          throw new CelebrateError("Введен некорректный email");
        }
        return value;
      }),
    password: Joi.string().required(),
  }),
});

export const userFeedbackValidation = celebrate({
  body: Joi.object().keys({
    feedback: Joi.string().required(),
  }),
});
