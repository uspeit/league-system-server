import DataTypes from "sequelize";
import sequelize from "./db.js";
import { UserData } from "./user.js";

const Op = DataTypes.Sequelize.Op;

const RefereeData = sequelize.define("referee", {
  first_name: DataTypes.TEXT,
  last_name: DataTypes.TEXT,
  idNum: {
    type: DataTypes.TEXT,
    primaryKey: true,
  },
  phone: DataTypes.TEXT,
  email: DataTypes.TEXT,
});

export async function syncReferees(addDefaults){
  await RefereeData.sync({
    force: true,
  });
  /* istanbul ignore next */
  if (process.env.NODE_ENV === "dev" || addDefaults) {
    let referee1 = await RefereeData.create({
      first_name: "aiman",
      last_name: "saied",
      idNum: "12",
      phone: "054",
      email: "aiman@",
    });
    await referee1.save();

    let referee2 = await RefereeData.create({
      first_name: "moshe",
      last_name: "levi",
      idNum: "951",
      phone: "123456",
      email: "moshe@",
    });
    await referee2.save();
  }
}

export default RefereeData;
