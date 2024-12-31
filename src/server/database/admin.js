import db from "./client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SALT_COUNT = 2;
const JWT = process.env.JWT_SECRET;
 

const createAdmin = async ({ username, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const SQL = /*sql*/ `
            INSERT INTO admins(username, password)
            VALUES ($1, $2)
            RETURNING *
        `
        const response = await db.query(SQL, [
            username, 
            hashedPassword
        ])
        return response.rows[0]
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}


//---- AUTHENTICATE ADMIN -------------------------

const authenticate = async ({ username , password }) => {
    const SQL = `--sql
    SELECT id, password
    FROM admins
    WHERE username = $1
    `;
    const response = await db.query(SQL, [username]);
    console.log("userID", response.rows[0].id);
    console.log("full response from authenticate", response.rows[0]);
    if (
      !response.rows.length ||
      (await bcrypt.compare(password, response.rows[0].password)) === false
    ) {
      const error = Error("unauthorized");
      error.status = 401;
      throw error;
    }
    const token = await jwt.sign(
      { id: response.rows[0].id},
      JWT, 
      { expiresIn: '1h' }
    );
    console.log("token from authenticate", token);
    return token;
  };

export {
    createAdmin,
    authenticate
}