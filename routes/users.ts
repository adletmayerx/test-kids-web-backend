import { Router } from "express";
import { getUser, getUserInfo, updateFeedback } from "../controllers/user";
import { userIdValidation, loginValidation, userValidation, userFeedbackValidation } from "../middlewares/validation";

const userRouter = Router();

userRouter.get("/me", getUserInfo);
userRouter.get("/:id", userIdValidation, getUser);
userRouter.patch("/me/feedback", userFeedbackValidation, updateFeedback);

export default userRouter;
