import express from "express";
const adminRouter = express.Router()
import { authenticate } from "../database/admin.js";

adminRouter.post("/login", async (req, res, next) => {
    const { username , password } = req.body;
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both an email and password",
      });
    }
    try {
      const token = await authenticate({ username, password });
      console.log("teken from api route login", token);
      if (token) {
        res.send({
          message: "Login successful!",
          token,
        });
      } else {
        next({
          name: "IncorrectCredentialsError",
          message: "Username or password is incorrect",
        });
      }
    } catch (error) {
      next(error);
    }
  });
  



export { adminRouter }
