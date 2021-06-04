import express from 'express';
import Refree from '../models/referee.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import RefereeData from '../data/referee.js';

const privateKey = fs.readFileSync('keys/private.pem');

const router = express.Router();

//router.post('/add', function (req, res) {
//  // TODO
//  res.status(200).send({
//    userRole: req.user.role
//  });
//})
// Add referee route
router.post('/addReferee', function (req, res) {
  if(req.user.role == 'representative'){
    if(!req.body.first_name || !req.body.last_name || !req.body.id || !req.body.phone || !req.body.email){
      res.status(400).send("One or more data is missing")  
    }
    else{
      const referee=new Referee(req.body.first_name,req.body.last_name,req.body.id,req.body.phone,req.body.email)
      let refereeData = await RefereeData.create(user);
      await referee.save()
      res.status(200).send("Success")
    }
  }
  else{
    res.status(400).send("You can't register new referee")
  }
})

router.post('/updateDataReferee',function (req,res) {
  if(req.user.role=='representative'){
    if(!req.body.id){
      res.status(400).send("Please enter id referee.")
    }
    else{
      let referee=Referee.getById(req.body.id)
      referee.updateData(req.body.first_name,req.body.last_name,req.body.id,req.body.phone,req.body.email)
      res.status(200).send("Success")
    }
  }
  else if(req.user.role=='referee'){
    let referee=Referee.getById(req.user.id);
    referee.updateData(req.body.first_name,req.body.last_name,req.body.id,req.body.phone,req.body.email)
    res.status(200).send("Success")
  }
  else{
    res.status(400).send("You can't update data referee")
  }
})

router.get('/getRefereeGames',function (req,res) {
  if(req.user.role=='referee'){
    let referee=Referee.getById(req.user.id);
    refereeGames=referee.getMyGames()
    res.status(200).send(refereeGames)
  }
  else{
    res.status(400).send("You can't get data from referee")
  }
})

router.post('addEventsGame',function (req,res){
  if(req.user.role=='referee'){
    let referee=Referee.getById(req.user.id);
    let game=game.getById(req.body.gameId);
    referee.addEventsGame(game,req.body.event);
    res.status(200).send("Success")
  }
  else{
    res.status(400).send("You can't add events game")
  }
})

router.post('updateGame',function (req,res){
  if(req.user.role=='referee'){
    let referee=Referee.getById(req.user.id);
    let game=game.getById(req.body.gameId);
    if(referee.id==game.referee.id){
      referee.updateEventsGame(game,req.body.event);
      res.status(200).send("Success")
    }
    else{
      res.status(400).send("You can't update events game")  
    }  
  }
  else{
    res.status(400).send("You can't update events game")
  }
})
export default router