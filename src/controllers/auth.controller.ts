import { Request, Response } from "express";
import { generateToken } from "../utils/jwt.utils";

const adminUser = {
  email: "admin@codesfortomorrow.com",
  password: "Admin123!@#",
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (email === adminUser.email && password === adminUser.password) {
      // If generateToken is async
      const token = await generateToken({ email });
      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
