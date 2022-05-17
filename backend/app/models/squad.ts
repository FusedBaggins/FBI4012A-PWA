import Sequelize, { Model } from 'sequelize';

import database from '../database/database';

class Squad extends Model {
    name!: string;
}

Squad.init(
    { 
         name: Sequelize.STRING 
    },
    { sequelize: database.connection, freezeTableName: true }
);

export default Squad;