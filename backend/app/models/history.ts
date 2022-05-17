import Sequelize, { Model } from 'sequelize';

import Squad from './squad';
import Sprint from './sprint';
import database from '../database/database';

class History extends Model {
    burdown!: number;
    burdownGoal!: number;
    escapedDefects!: number;
    escapedDefectsGoal!: number;
    feedback!: number;
    feedbackGoal!: number;
}

History.init(
    {
        burdown: Sequelize.INTEGER,
        burdownGoal: Sequelize.INTEGER,
        escapedDefects: Sequelize.INTEGER,
        escapedDefectsGoal: Sequelize.INTEGER,
        feedback: Sequelize.INTEGER,
        feedbackGoal: Sequelize.INTEGER,
    },
    { sequelize: database.connection, freezeTableName: true }
);

Sprint.belongsToMany(Squad, {through: History});
Squad.belongsToMany(Sprint, {through: History});

export default History;