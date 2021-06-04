import DataTypes from 'sequelize';
import sequelize from './db.js'

const Op = DataTypes.Sequelize.Op;

const RefereeData = sequelize.define("referee", {
    first_name: DataTypes.TEXT,
    last_name: DataTypes.TEXT,
    id: DataTypes.TEXT,
    phone: DataTypes.TEXT, 
    email: DataTypes.TEXT,
});

await RefereeData.sync({
    force: true
});

export default RefereeData