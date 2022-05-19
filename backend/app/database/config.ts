import { Options } from "sequelize";

let config: Options = {
    dialect: 'postgres',
    host: undefined,
    username: undefined,
    password: undefined,
    database: undefined,
    logging: true,
    port: 5432,
    define: {
        timestamps: true,
    }
}

export default config;
