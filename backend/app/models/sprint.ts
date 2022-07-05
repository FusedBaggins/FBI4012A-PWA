import Sequelize, { Model } from 'sequelize';
import database from '../database/database';

class Sprint extends Model {
    id!: number;
    name!: string;
    status!: "Em andamento" | "Não iniciada" | "Encerrada";
    isActive!: boolean;
    startDate!: Date;
    endDate!: Date;
    squads!: any;
}

Sprint.init(
    {
        name: Sequelize.STRING,
        status: Sequelize.STRING,
        isActive: Sequelize.BOOLEAN,
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE
    },
    { sequelize: database.connection, freezeTableName: true }
);

Sprint.addHook('beforeCreate', async (sprint: Sprint) => {
    const now: Date = new Date();
    if (now.getTime() > sprint.startDate.getTime()) sprint.status = 'Em andamento';
    if (now.getTime() < sprint.startDate.getTime()) sprint.status = 'Não iniciada';
    if (now.getTime() > sprint.endDate.getTime()) sprint.status = 'Encerrada';
});

export default Sprint;