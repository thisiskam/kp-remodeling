import dotenv from "dotenv";
import pkg from 'pg';
const { Client } = pkg;

dotenv.config()

const connectionString =
  process.env.DATABASE_URL || `postgres://localhost:5432/remodel_estimator`;

const db = new Client({
  connectionString,
  ssl: process.env.NODE_ENV === "production"
  ? { rejectUnauthorized: false }
  : undefined,
});

export default db;
