import { syncUsers } from "./user.js";
import { syncReferees } from "./referee.js";
import { syncGames } from "./games.js";

export default async function initDb(addDefaults) {
  await syncUsers(addDefaults);
  await syncReferees(addDefaults);
  await syncGames(addDefaults);
}
