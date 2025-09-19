import express from "express";
import { authenticate } from "../database/admin.js";

const adminRouter = express.Router();

adminRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;


  if (!username || !password) {
    return res.status(400).json({
      error: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {

    const token = await authenticate({ username, password });

    if (!token) {
      return res.status(401).json({
        error: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
    return res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (err) {
    return next(err);
  }
});

export { adminRouter };