import express from 'express';
import usersController from './services/users.js'
import gamesController from './services/games.js'
import refereesController from './services/referees.js'

const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())

app.use('/users', usersController)
app.use('/games', gamesController)
app.use('/referees', refereesController)


app.listen(8080, () =>
  console.log(`League server listening on port 8080!`),
);