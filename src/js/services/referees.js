import express from 'express';
import Referee from '../models/referee.js';
import fs from 'fs';
import Game from '../models/game.js';

const router = express.Router();

// Add referee route
router.post('/add', async function (req, res) {
  if(req.user.role === 'representative'){
    if(!req.body.first_name || !req.body.last_name || !req.body.idNum || !req.body.phone || !req.body.email){
      res.status(400).send("One or more data is missing")  
    }
    else{
      if(await Referee.addReferee(req.body.first_name,req.body.last_name,req.body.idNum,req.body.phone,req.body.email)){
        res.status(200).send("Success")
      }else{
        res.status(400).send("Failed referee user already exists")
      }
    }
  }
  else{
    res.status(400).send("You can't register new referee")
  }
})

router.put('/updateData',async function (req,res) {
  if(req.user.role==='representative'){
    if(!req.body.idNum){
      res.status(400).send("Please enter id num referee.")
    }
    else{
      let referee = await Referee.getById(req.body.idNum)
      if(!referee){
        res.status(400).send("Referee id doesn't exist")
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
      res.status(400).send("You can't update data referee")
    }
    else{
      if(Referee.updateData(req.body.first_name,req.body.last_name,req.user.idUserNum,req.body.phone,req.body.email)){
        res.status(200).send("Success")
      }else{
        res.status(400).send("Update data failed")
      }
    }
  }
  else{
    res.status(400).send("You can't update data referee")
  }
})

router.get('/getRefereeGames',async function (req,res) {
  if(req.user.role=='referee'){
    let referee=await Referee.getById(req.user.idUserNum);
    if(!referee){
      res.status(400).send("You can't get data referee")
    }
    else{
      const refereeGames=await Referee.getMyGames(req.user.idUserNum)
      res.status(200).send(refereeGames)
    }
  }
  else{
    res.status(400).send("You can't get data from referee")
  }
})

  
router.post('/addEventsGame',async function (req,res){
  if(req.user.role=='referee'){
    let referee=await Referee.getById(req.user.idUserNum);
    if(!referee){
      res.status(400).send("You can't get data referee")
    }
    else if(req.body.gameId){
      //let game=await Game.getById(req.body.gameId);
      //res.status(200).send(game)
      if(await Referee.addEventsGame(req.user.idUserNum,req.body.gameId,req.body.event)){
        res.status(200).send("Success")
      }
      else{
        res.status(400).send("Failed")
      }
    }
    else{
      res.status(400).send("Please enter a game id")
    }
  }
  else{
    res.status(400).send("You can't add events game")
  }
})

router.post('/updateGame',async function (req,res){
  if(req.user.role=='referee'){
    let referee=await Referee.getById(req.user.idUserNum);
    if(!referee){
      res.status(400).send("You can't get data referee")
    }
    else{
      if(!req.body.row){
        res.status(400).send('Please enter a row that you want to change')
        return false;
      }if(!req.body.event){
        res.status(400).send('Please enter a new event')
        return false
      }
      let game=await Game.updateEvent(req.body.gameId,req.user.idUserNum,req.body.event,req.body.row);
      if(game){
        await Referee.updateEventsGame(game,req.body.event);
        res.status(200).send("Success")
      }
      else{
        res.status(400).send("You can't update events game")  
      }  
    }
  }
  else{
    res.status(400).send("You can't update events game")
  }
})
export default router