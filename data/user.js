import DataTypes from 'sequelize';
import sequelize from './db.js'

const UserData = sequelize.define("user", {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT,
    email: DataTypes.TEXT
});

await UserData.sync({ force: true });

export default UserData