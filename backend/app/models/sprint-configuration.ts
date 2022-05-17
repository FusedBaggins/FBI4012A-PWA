import Sequelize, { Model } from 'sequelize';

import Sprint from './sprint';
import database from '../database/database';

class SprintConfiguration extends Model {
    name!: string;
    burdownMax!:string;
    escapedDefectsMax!: number;
    feedbackMax!: number;
}

SprintConfiguration.init(
    {
        name: Sequelize.STRING,
        burdownMax: Sequelize.INTEGER,
        escapedDefectsMax: Sequelize.INTEGER,
        feedbackMax: Sequelize.INTEGER,
    },
    { sequelize: database.connection, freezeTableName: true }
);

Sprint.belongsTo(SprintConfiguration);

export default SprintConfiguration;