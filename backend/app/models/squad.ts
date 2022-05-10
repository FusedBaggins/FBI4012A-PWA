import Sequelize, { Model } from 'sequelize';
import database from '../database/database';

class Squad extends Model {
    id!: number;
    name!: string;
}

Squad.init(
    { id: Sequelize.NUMBER, name: Sequelize.STRING },
    { sequelize: database.connection, freezeTableName: true }
);

export default Squad;