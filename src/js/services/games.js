import express from 'express';
import User from '../models/user.js';
import Game from '../models/game.js';
import Referee from '../models/referee.js';

const router = express.Router();

// Schedule game route
//router.post('/schedule', function (req, res) {
//  // TODO
//  res.status(200).send('Success');
//})

router.put('/updateRefereeGame',async function (req,res) {
  if(req.user.role==='representative'){
    if(!req.body.gameId){
      res.status(400).send("Please enter game id number.")
    }
    else{
      let game = await Game.getById(req.body.gameId)
      if(!game){
        res.status(400).send("Game id doesn't exist")
      }
      else{
        await Game.updateData(req.body.gameId,req.body.Date,req.body.Stadium,req.body.RefereeId)
        res.status(200).send("Success")
      }
    }
  }
  else if(req.user.role==='referee'){
    let referee=await Referee.getById(req.user.idNum);
    if(!referee){
      res.status(400).send("You can't update data game")
    }
    else{
      if(Game.updateData(req.body.Result,req.body.Events)){
        res.status(200).send("Success")
      }
      else{
        res.status(400).send("Update data failed")
      }
    }
  }
  else{
    res.status(400).send("You can't update data game")
  }
})
export default router