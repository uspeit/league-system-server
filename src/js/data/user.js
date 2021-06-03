import DataTypes from 'sequelize';
import sequelize from './db.js'

const UserData = sequelize.define("user", {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    username: DataTypes.TEXT,
    password: DataTypes.TEXT,
    email: DataTypes.TEXT
});

await UserData.sync({
    // force: true
});

export default UserData