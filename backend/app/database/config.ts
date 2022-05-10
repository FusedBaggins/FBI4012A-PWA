import { Options } from "sequelize";

let config: Options = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
    define: {
        timestamps: true,
    }
}

export default config;
