import DataTypes from "sequelize";
import sequelize from "./db.js";
import { UserData } from "./user.js";

//const Op = DataTypes.Sequelize.Op;

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

export async function syncReferees(addDefaults) {
  await RefereeData.sync({
    force: true,
  });
  /* istanbul ignore next */
  if (process.env.NODE_ENV === "dev" || addDefaults) {
    let referee = await RefereeData.create({
      first_name: "moshe",
      last_name: "levi",
      idNum: "1",
      phone: "123456",
      email: "moshe@",
    });
    await referee.save();

    let entry = await UserData.create({
      username: "aiman",
      password: "123",
      idUserNum: "208112557",
      email: "aiman@",
      role: "referee",
    });
    await entry.save();
  }
}

export default RefereeData;