import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "mysql",
    schema: "./utils/schema.js",
    // out: "./drizzle",
    // driver: 'mysql2',
    dbCredentials: {
        host: "127.0.0.1",
        user: "root",
        database: "attendance-track",
        // password:'',
        port:'3306'
    }
});
