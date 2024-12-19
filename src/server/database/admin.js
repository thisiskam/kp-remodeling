import db from "./client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SALT_COUNT = 2;
const JWT = process.env.JWT_SECRET;
 