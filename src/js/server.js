import app from "./app.js";
import initDb from "./data/init.js";

/**
 * This file sets up our Database and starts our Express Server
 */

await initDb();
console.log(`DB syncronized`);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`League server listening on port: ${PORT}`));
