export default router
import express from 'express';
import Refree from '../models/referee';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';


const router = express.Router();

router.post('/add', function (req, res) {
  // TODO
  res.status(200).send({
    userRole: req.user.role
  });
})
// Add referee route
router.post('/addReferee', function (req, res) {
  if(req.user.role=='')
  if(!req.body.name || !req.body.id || !req.body.phone || !req.body.email){
    res.status(400).send("One or more data is missing")  
  }
  else{
    let referee=new Referee(req.body.name,req.body.id,req.body.phone,req.body.email)
    await referee.save()
    res.status(200).send("Success")
  }
})

export default router