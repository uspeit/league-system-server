import DataTypes from 'sequelize';
import sequelize from './db.js'

const Op = DataTypes.Sequelize.Op;

const RefereeData = sequelize.define("referee", {
    first_name: DataTypes.TEXT,
    last_name: DataTypes.TEXT,
    idNum: {
        type: DataTypes.TEXT,
        primaryKey: true
    },
    phone: DataTypes.TEXT, 
    email: DataTypes.TEXT,
});

await RefereeData.sync({
    force: true
});

export default RefereeData