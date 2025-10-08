import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "personal-web",
    password: "rizki",
    port: 5432
})

export default pool