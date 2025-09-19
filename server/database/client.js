
import 'dotenv/config';
import dns from 'dns';
import pkg from 'pg';
const { Pool } = pkg;


function buildPoolFromDatabaseUrl(databaseUrl) {
  const url = new URL(databaseUrl);
  const host = url.hostname;                 
  const port = Number(url.port || 5432);
  const user = decodeURIComponent(url.username || 'postgres');
  const password = decodeURIComponent(url.password || '');
  const database = url.pathname.replace(/^\//, '') || 'postgres';

  return new Promise((resolve, reject) => {
    dns.lookup(host, { family: 4 }, (err, address /* ipv4 */) => {
      if (err) return reject(err);

      const pool = new Pool({
        host: address,        
        port,
        user,
        password,
        database,
        ssl: {
          rejectUnauthorized: false,
          servername: host,
        },
      });

      resolve(pool);
    });
  });
}

let _poolPromise;


function getPool() {
  if (!_poolPromise) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('Missing DATABASE_URL');
    _poolPromise = buildPoolFromDatabaseUrl(url);
  }
  return _poolPromise;
}

export default {
  query: async (text, params) => {
    const pool = await getPool();
    return pool.query(text, params);
  },
  connect: async () => {
    const pool = await getPool();
    return pool.connect();
  },
};
