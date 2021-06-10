import express from 'express';
import Referee from '../models/referee.js';
import fs from 'fs';
import Game from '../models/game.js';


export class RefereeService {

  // Add referee route
  static async postAddReferee(req, res) {
    if(req.user.role === 'representative'){
      if(!req.body.first_name || !req.body.last_name || !req.body.idNum || !req.body.phone || !req.body.email){
        res.status(400).send({ err:"One or more data is missing"});
      }
      else{
        let err=await Referee.addReferee(req.body.first_name,req.body.last_name,req.body.idNum,req.body.phone,req.body.email)
        if(!err){
          res.status(200).send("Success")
        }else{
          res.status(400).send({
            err:err
          })
        }
      }
    }
    else{
      res.status(400).send({err:"You can't register new referee"})
    }
  }

  static async putUpdateData(req,res) {
    if(req.user.role==='representative'){
      if(!req.body.idNum){
        res.status(400).send({err:"Please enter id num referee."})
      }
      else{
        let referee = await Referee.getById(req.body.idNum)
        if(!referee){
          res.status(400).send({err:"Referee id doesn't exist"})
        }
        else{
          await Referee.updateData(req.body.first_name,req.body.last_name,req.body.idNum,req.body.phone,req.body.email)
          res.status(200).send("Success")
        }
      }
    }
    else if(req.user.role==='referee'){
      let referee=await Referee.getById(req.user.idUserNum);
      if(!referee){
        res.status(400).send({err:"You can't update data referee"})
      }
      else{
        if(Referee.updateData(req.body.first_name,req.body.last_name,req.user.idUserNum,req.body.phone,req.body.email)){
          res.status(200).send("Success")
        }
      }
    }
    else{
      res.status(400).send({err:"You can't update data referee"})
    }
  }
  
  /* istanbul ignore next */
  static async getRefereeGames(req,res) {
    if(req.user.role==='referee'){
      let referee=await Referee.getById(req.user.idUserNum);
      if(!referee){
        res.status(400).send({err:"You can't get data referee"})
      }
      else{
        const refereeGames=await Referee.getMyGames(req.user.idUserNum)
        res.status(200).send({refereeGames:refereeGames})
      }
    }
    else{
      res.status(400).send({err:"You can't get data from referee"})
    }
  }

  static async postAddEventsGame(req,res){
    if(req.user.role==='referee'){
      let referee=await Referee.getById(req.user.idUserNum);
      if(!referee){
        res.status(400).send({err:"You can't get data referee"})
      }
      else if(req.body.gameId){
        //let game=await Game.getById(req.body.gameId);
        //res.status(200).send(game)
        if(await Referee.addEventsGame(req.user.idUserNum,req.body.gameId,req.body.event)){
          res.status(200).send("Success")
        }
        else{
          res.status(400).send({err:"Failed"})
        }
      }
      else{
        res.status(400).send({err:"Please enter a game id"})
      }
    }
    else{
      res.status(400).send({err:"You can't add events game"})
    }
  }

  static async postUpdateGame(req,res){
    if(req.user.role=='referee'){
      let referee=await Referee.getById(req.user.idUserNum);
      if(!referee){
        res.status(400).send({err:"You can't get data referee"})
      }
      else{
        if(!req.body.row){
          res.status(400).send({err:'Please enter a row that you want to change'})
          return false;
        }if(!req.body.event){
          res.status(400).send({err:'Please enter a new event'})
          return false
        }
        let game=await Game.updateEvent(req.body.gameId,req.user.idUserNum,req.body.event,req.body.row);
        if(game){
          //await Referee.updateEventsGame(game,req.body.event);
          res.status(200).send("Success")
        }
        else{
          res.status(400).send({err:"You can't update events game"})  
        }  
      }
    }
    else{
      res.status(400).send({err:"You can't update events game"})
    }
  }
}
const router = express.Router();
router.post("/updateGame",RefereeService.postUpdateGame)
router.post("/addReferee",RefereeService.postAddReferee)
router.post("/addEventsGame",RefereeService.postAddEventsGame)
router.get("/getRefereeGames",RefereeService.getRefereeGames)
router.put("/updateData",RefereeService.putUpdateData)
export default router