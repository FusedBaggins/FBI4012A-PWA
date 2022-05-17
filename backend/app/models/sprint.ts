import Sequelize, { Model } from 'sequelize';
import database from '../database/database';

class Sprint extends Model {
    name!: string;
    isActive!: boolean;
    startDate!: Date;
    endDate!: Date;
}

Sprint.init(
    {
        name: Sequelize.STRING,
        isActive: Sequelize.BOOLEAN,
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE
    },
    { sequelize: database.connection, freezeTableName: true }
);

export default Sprint;