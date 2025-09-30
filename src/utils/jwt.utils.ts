// src/utils/jwt.utils.ts
import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

// Set expiry in seconds (1 day = 24*60*60)
const JWT_EXPIRES_IN_SECONDS = 24 * 60 * 60;

const signOptions: SignOptions = {
  expiresIn: JWT_EXPIRES_IN_SECONDS,
};

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, signOptions);
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid token");
  }
};



