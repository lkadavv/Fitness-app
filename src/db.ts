import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fitness_db',
  password: 'vlada2007',
  port: 5432,
});