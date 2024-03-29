import DataTypes from "sequelize";
import sequelize from "./db.js";
const Op = DataTypes.Sequelize.Op;

const UserData = sequelize.define("user", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idUserNum: DataTypes.TEXT,
  username: DataTypes.TEXT,
  password: DataTypes.TEXT,
  email: DataTypes.TEXT,
  role: DataTypes.ENUM(
    "user",
    "player",
    "referee",
    "coach",
    "manager",
    "representative"
  ),
});

export async function syncUsers(addDefaults) {
  await UserData.sync({
    force: true,
  });
  /* istanbul ignore next */
  if (process.env.NODE_ENV === "dev" || addDefaults) {
    let user = await UserData.create({
      username: "rep",
      password: "123",
      idUserNum: "123",
      email: "rep",
      role: "representative",
    });
    await user.save();

    let refereeUser = await UserData.create({
      username: "aiman",
      password: "12",
      idUserNum: "12",
      email: "aiman@",
      role: "referee",
    });
    await refereeUser.save();
  }
}

/**
 *
 * @param username Username to check for availability
 * @param email Email to check for availability
 * @returns True if both are available, False if at one is taken
 */
async function checkUserCredentials(username, email) {
  const user = await UserData.findOne({
    where: {
      [Op.or]: [
        {
          username: username,
        },
        {
          email: email,
        },
      ],
    },
  });

  return user !== null;
}

export { checkUserCredentials, UserData };
