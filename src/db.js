import postgres from 'postgres'
import dotenv from 'dotenv'
dotenv.config();

const sql = postgres(process.env.DB_URL, {
	ssl: true,
})

export default sql;
