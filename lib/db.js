// lib/db.js
import { Pool } from 'pg';

// Configure the PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL?process.env.POSTGRES_URL:'postgres://default:J3cHY9IlswaX@ep-calm-art-a4qknd64-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require',
})
// Function to execute queries
export async function queryDB(query, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result;
  } finally {
    client.release();
  }
}
