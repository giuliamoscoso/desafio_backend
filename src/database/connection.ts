import { createPool } from "mysql2";

require("dotenv").config();

const pessoasPool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    waitForConnections: true,
});

export { pessoasPool };
