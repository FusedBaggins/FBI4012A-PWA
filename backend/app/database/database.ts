import Sequelize from 'sequelize';

import config from './config';
import User from '../models/user';
import Squad from '../models/squad';
import Sprint from '../models/sprint';
import History from '../models/history';
import SprintConfiguration from '../models/sprint-configuration';



class Database {
    connection!: Sequelize.Sequelize;

    constructor() {
        this.connection = new Sequelize.Sequelize(config);
        this._syncDatabase();
    }

    private _syncDatabase(): void {
        User.sync({ alter: true });
        Sprint.sync({ alter: true });
        Squad.sync({ alter: true });
        SprintConfiguration.sync({ alter: true });
        History.sync({ alter: true });
    }

}

export default new Database();
