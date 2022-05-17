import bcrypt from 'bcryptjs';
import database from '../database/database';
import Sequelize, { Model } from 'sequelize';

class User extends Model {
    name!: string;
    username!: string;
    password!: string;
    hash!: string;
    isAdmin!: boolean;

    public async checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.hash);
    }
}

User.init(
    {
        name: Sequelize.STRING,
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        hash: Sequelize.STRING,
        isAdmin: Sequelize.BOOLEAN,
    },
    { sequelize: database.connection, freezeTableName: true }
);

User.addHook('beforeSave', async (user: User): Promise<void> => {
    if(user.password){
        user.hash = await bcrypt.hash(user.password, 8);
    }
});

export default User;