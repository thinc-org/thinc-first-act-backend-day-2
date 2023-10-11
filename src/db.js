import dotenv from 'dotenv'
dotenv.config();
import postgres from 'postgres'

const sql = postgres(process.env.DB_URL)

export default sql;
