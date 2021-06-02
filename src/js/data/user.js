import DataTypes from 'sequelize';
import sequelize from './db.js'

const UserData = sequelize.define("user", {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT,
    email: DataTypes.TEXT
});

if (process.env.NODE_ENV === 'dev') {
    async () => {
        await UserData.sync({
            force: true
        });
    }
}

export default UserData