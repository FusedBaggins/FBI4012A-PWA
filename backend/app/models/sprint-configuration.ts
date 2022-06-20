import Sequelize, { Model } from 'sequelize';

import Sprint from './sprint';
import database from '../database/database';

class SprintConfiguration extends Model {
    id!:number;
    name!: string;
    burdownMax!:string;
    burdownGoal!:string;
    escapedDefectsMax!: number;
    escapedDefectsGoal!: number;
    feedbackMax!: number;
    feedbackGoal!: number;
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

Sprint.belongsTo(SprintConfiguration, {foreignKey: 'sprintConfigurationId'});

export default SprintConfiguration;