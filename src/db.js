import postgres from 'postgres'

const sql = postgres(process.env.DB_URL)

export default sql;
