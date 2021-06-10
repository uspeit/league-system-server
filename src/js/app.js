import express from "express";
import usersController from "./services/users.js";
import gamesController from "./services/games.js";
import refereesController from "./services/referees.js";
import passport from "./auth.js";

/**
 * This file defines and configures the Express application
 */

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/users", usersController);
app.use(
  "/games",
  passport.authenticate("jwt", {
    session: false,
    optional: false,
  }),
  gamesController
);
app.use(
  "/referees",
  passport.authenticate("jwt", {
    session: false,
    optional: false,
  }),
  refereesController
);

export default app;
