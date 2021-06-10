import express from 'express';
import User from '../models/user.js';
import Game from '../models/game.js';
import Referee from '../models/referee.js';


export class GameService {
  static async putUpdateRefereeGame(req,res) {
    if(req.user.role==='representative'){
      if(!req.body.gameId){
        res.status(400).send({err:"Please enter game id number."})
      }
      else{
        let game = await Game.getById(req.body.gameId)
        if(!game){
          res.status(400).send({err:"Game id doesn't exist"})
        }
        else{
          await Game.updateData(req.body.gameId,req.body.Date,req.body.Stadium,req.body.RefereeId)
          res.status(200).send("Success")
        }
      }
    }
    else if(req.user.role==='referee'){
      let referee=await Referee.getById(req.user.idUserNum);
      if(!referee){
        res.status(400).send({err:"You can't update data game"})
      }
      else{
        Game.updateData(req.body.Result,req.body.Events)
        res.status(200).send("Success")
      }
    }
    else{
      res.status(400).send({err:"You can't update data game"})
    }
  }
}

const router = express.Router();
router.put("/updateRefereeGame",GameService.putUpdateRefereeGame)
export default router