import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const privateKey = fs.readFileSync('keys/private.pem');

const router = express.Router();

// Login route
router.post('/login', async function (req, res) {
    if (!req.body.username || !req.body.password)
        res.status(400).send('Please enter username and password')
    else {
        let token = await User.login(req.body.username, req.body.password)
        if (token) {
            token = jwt.sign(token, privateKey, {
                // algorithm: 'RS256'
            })
            res.status(200).send({
                token: token
            })
        } else
            res.status(400).send({
                err: 'Invalid Username or Password'
            });
    }
})

// Sign up route
router.post('/signup', async function (req, res) {
    if (req.body.masterPassword != '345') // Require password "345" as master password for easy management
        res.status(400).send({
            err: 'Unauthorized'
        })

    if (!req.body.username || !req.body.password || !req.body.email || !req.body.role)
        res.status(400).send({
            err: 'Please enter username, password, email and role'
        })

    const err = await User.register(req.body.username, req.body.password, req.body.email, req.body.role)
    if (err === null)
        res.status(200).send({
            err: null
        });
    else
        res.status(400).send({
            err: err
        });
})

export default router