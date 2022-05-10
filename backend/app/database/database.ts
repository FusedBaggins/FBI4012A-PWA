import Sequelize from 'sequelize';
import config from './config';

class Database {
    connection!: Sequelize.Sequelize;

    constructor() {
        this.connection = new Sequelize.Sequelize(config);
    }
}

export default new Database();