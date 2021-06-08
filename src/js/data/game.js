import DataTypes from "sequelize";
import sequelize from "./db.js";

const Op = DataTypes.Sequelize.Op;

const GameData = sequelize.define("game", {
  gameId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Date: DataTypes.DATE,
  Home_team: DataTypes.TEXT,
  Away_team: DataTypes.TEXT,
  Stadium: DataTypes.TEXT,
  RefereeId: DataTypes.TEXT,
  Result: DataTypes.TEXT,
  Events: DataTypes.ARRAY(DataTypes.TEXT),
});

export async function syncGames(addDefaults) {
  await GameData.sync({
    force: true,
  });

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "dev" || addDefaults) {
    let game1 = await GameData.create({
      Date: new Date(2021, 6, 21, 15, 0),
      Home_team: "Bnie Sakhnin",
      Away_team: "Hapoel Beer Sheva",
      Stadium: "Doha",
      Result: "0:0",
      Events: [],
    });
    await game1.save();

    let game2 = await GameData.create({
      Date: new Date(2021, 6, 28, 19, 0),
      Home_team: "Hapoel Beer Sheva",
      Away_team: "Hapoel Tel aviv",
      RefereeId: "12",
      Stadium: "Turner",
      Result: "0:0",
      Events: [],
    });
    await game2.save();
  }
}

export default GameData;
