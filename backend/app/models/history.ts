import Sequelize, { Model } from 'sequelize';

import Squad from './squad';
import Sprint from './sprint';
import database from '../database/database';

class History extends Model {
    id!:number;
    burndown!: number;
    burndownMax!: string;
    burndownGoal!: number;
    escapedDefects!: number;
    escapedDefectsMax!: number;
    escapedDefectsGoal!: number;
    feedback!: number;
    feedbackMax!: number;
    feedbackGoal!: number;
    isActive!: boolean;
}

History.init(
    {
        burndown:{ type: Sequelize.INTEGER, defaultValue: 0 },
        burndownMax:{ type: Sequelize.INTEGER, defaultValue: 0 },
        burndownGoal:{ type: Sequelize.INTEGER, defaultValue: 0 },
        escapedDefects:{ type: Sequelize.INTEGER, defaultValue: 0 },
        escapedDefectMax: { type: Sequelize.INTEGER, defaultValue: 0 },
        escapedDefectsGoal: { type: Sequelize.INTEGER, defaultValue: 0 },
        feedback:{ type: Sequelize.INTEGER, defaultValue: 0 },
        feedbackMax: { type: Sequelize.INTEGER, defaultValue: 0 },
        feedbackGoal: { type: Sequelize.INTEGER, defaultValue: 0 },
        isActive: { type: Sequelize.BOOLEAN, defaultValue: true }
    },
    { sequelize: database.connection, freezeTableName: true }
);

Sprint.belongsToMany(Squad, { through: History, foreignKey: 'sprintId', as: 'squads' });
Squad.belongsToMany(Sprint, { through: History, foreignKey: 'squadId' });

export default History;