import DataTypes from 'sequelize';
import sequelize from './db.js'
import { UserData } from './user.js';

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
let refereeUser = await UserData.create({
    username: 'aiman',
    password: '123',
    email: 'aiman@',
    role: 'referee'
})
await refereeUser.save()
let referee = await RefereeData.create({
    first_name:'aiman',
    last_name:'saied',
    idNum:'12',
    phone:'054',
    email: 'aiman@'
})
await referee.save()

export default RefereeData