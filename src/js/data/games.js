import DataTypes from 'sequelize';
import sequelize from './db.js'

const Op = DataTypes.Sequelize.Op;

const GameData = sequelize.define("referee", {
    Date: DataTypes.DATE,
    time: DataTypes.TIME,
    Home_team:DataTypes.TEXT,
    Away_team:DataTypes.TEXT,
    Stadium: DataTypes.TEXT,
    Result: DataTypes.TEXT,
    Events: DataTypes.ARRAY
});

await GameData.sync({
    force: true
});

export default GameData