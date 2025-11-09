import mongoose from "mongoose";
import { getSecret } from "../configuration";

export const connectMongo = async () => {
  try {
    const { mongoUrl } = getSecret();
    await mongoose.connect(mongoUrl);
    console.log("Database connected successfully ✨");
  } catch (err) {
    console.error("Database connection error 💩: ", err);
  }
}