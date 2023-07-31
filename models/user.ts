import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v: string) {
        return validator.isEmail(v);
      },
      message: "Введен некорректный email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  feedback: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
