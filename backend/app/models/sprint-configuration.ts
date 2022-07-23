import Sequelize, { Model } from 'sequelize';

import Sprint from './sprint';
import database from '../database/database';

class SprintConfiguration extends Model {
    id!:number;
    name!: string;
    burndownMax!:string;
    burndownGoal!:string;
    escapedDefectsMax!: number;
    escapedDefectsGoal!: number;
    feedbackMax!: number;
    feedbackGoal!: number;
}

SprintConfiguration.init(
    {
        name: Sequelize.STRING,
        burndownMax: Sequelize.INTEGER,
        burndownGoal: Sequelize.INTEGER,
        escapedDefectsMax: Sequelize.INTEGER,
        escapedDefectsGoal: Sequelize.INTEGER,
        feedbackMax: Sequelize.INTEGER,
        feedbackGoal: Sequelize.INTEGER
    },
    { sequelize: database.connection, freezeTableName: true }
);

Sprint.belongsTo(SprintConfiguration, {foreignKey: 'sprintConfigurationId', as:'sprintConfiguration'});

export default SprintConfiguration;