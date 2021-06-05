import express from 'express';
import Refree from '../models/referee.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import RefereeData from '../data/referee.js';
import Referee from '../models/referee.js';

const privateKey = fs.readFileSync('keys/private.pem');

const router = express.Router();

//router.post('/add', function (req, res) {
//  // TODO
//  res.status(200).send({
//    userRole: req.user.role
//  });
//})
// Add referee route

router.post('/add', async function (req, res) {
  if(req.user.role === 'representative'){
    if(!req.body.first_name || !req.body.last_name || !req.body.idNum || !req.body.phone || !req.body.email){
      res.status(400).send("One or more data is missing")  
    }
    else{
      await Referee.addReferee(req.body.first_name,req.body.last_name,req.body.idNum,req.body.phone,req.body.email)
      res.status(200).send("Success")
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
    let referee=Referee.getById(req.user.id);
    if(!referee){
      res.status(400).send("You can't update data referee")
    }
    else{
      referee.updateData(req.body.first_name,req.body.last_name,req.body.id,req.body.phone,req.body.email)
      res.status(200).send("Success")
    }
  }
  else{
    res.status(400).send("You can't update data referee")
  }
})

router.get('/getRefereeGames',function (req,res) {
  if(req.user.role=='referee'){
    let referee=Referee.getById(req.user.id);
    if(!referee){
      res.status(400).send("You can't get data referee")
    }
    else{
      refereeGames=referee.getMyGames()
      res.status(200).send(refereeGames)
    }
  }
  else{
    res.status(400).send("You can't get data from referee")
  }
})

router.post('addEventsGame',function (req,res){
  if(req.user.role=='referee'){
    let referee=Referee.getById(req.user.id);
    if(!referee){
      res.status(400).send("You can't get data referee")
    }
    else{
      let game=game.getById(req.body.gameId);
      referee.addEventsGame(game,req.body.event);
      res.status(200).send("Success")
    }
  }
  else{
    res.status(400).send("You can't add events game")
  }
})

router.post('updateGame',function (req,res){
  if(req.user.role=='referee'){
    let referee=Referee.getById(req.user.id);
    if(!referee){
      res.status(400).send("You can't get data referee")
    }
    else{
      let game=game.getById(req.body.gameId);
      if(referee.id==game.referee.id){
        referee.updateEventsGame(game,req.body.event);
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