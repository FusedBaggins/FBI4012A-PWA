import Sequelize, { Model } from 'sequelize';

import Squad from './squad';
import Sprint from './sprint';
import database from '../database/database';

class History extends Model {
    id!:number;
    burdown!: number;
    burdownMax!: string;
    burdownGoal!: number;
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
        burdown: Sequelize.INTEGER,
        burdownMax: Sequelize.INTEGER,
        burdownGoal: Sequelize.INTEGER,
        escapedDefects: Sequelize.INTEGER,
        escapedDefectMax: Sequelize.INTEGER,
        escapedDefectsGoal: Sequelize.INTEGER,
        feedback: Sequelize.INTEGER,
        feedbackMax: Sequelize.INTEGER,
        feedbackGoal: Sequelize.INTEGER,
        isActive: { type: Sequelize.BOOLEAN, defaultValue: true }
    },
    { sequelize: database.connection, freezeTableName: true }
);

Sprint.belongsToMany(Squad, { through: History, foreignKey: 'sprintId', as: 'squads' });
Squad.belongsToMany(Sprint, { through: History, foreignKey: 'squadId' });

export default History;