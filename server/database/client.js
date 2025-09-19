import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // pooler URL with pgbouncer=true&sslmode=require
  // keep SSL relaxed because Supabase uses a public cert chain
  ssl: { rejectUnauthorized: false },
  // good defaults for PgBouncer session pool
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => console.error('[pg pool error]', err));

export default {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
};