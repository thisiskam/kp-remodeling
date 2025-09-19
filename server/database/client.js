// server/database/client.js
import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

// Last-resort switch that makes Node skip cert verification.
// Must be set BEFORE any TLS connection is created.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const url = new URL(process.env.DATABASE_URL); // your Supabase *Session Pooler* URL

const pool = new Pool({
  host: url.hostname,                         // aws-1-us-west-1.pooler.supabase.com
  port: Number(url.port || 5432),             // use the port shown by Supabase for the pooler
  user: decodeURIComponent(url.username),     // e.g. postgres.mviwawhgdmpkvvkseois
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, '') || 'postgres',
  ssl: { rejectUnauthorized: false },         // explicit TLS option node-postgres understands
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => console.error('[pg pool error]', err));

export default {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
};
