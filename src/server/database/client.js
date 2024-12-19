import dotenv from "dotenv";
import pkg from 'pg';
const { Client } = pkg;

dotenv.config()

const connectionString =
  process.env.DATABASE_URL || `postgres://localhost:5432/remodel_estimator`;

  const sslConfig = false;

const db = new Client({
  connectionString,
  ssl: sslConfig
});


export default db;
