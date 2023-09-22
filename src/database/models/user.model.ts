import { Schema, model } from "mongoose";
import { IUser } from "../interfaces";

const UserSchema = new Schema<IUser>({
  name: {
    type: String
  },
  email: {
    type: String,
  },
  password: {
    type: String
  }
})

const User = model<IUser>("User", UserSchema);
export { User };
