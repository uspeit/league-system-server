import express from 'express';
import User from '../models/user.js';
const router = express.Router();

// Login route
router.post('/login', async function (req, res) {
    if (!req.body.username || !req.body.password)
        res.status(400).send('Please enter username and password')
    else {
        let user = new User(req.body.username, req.body.password);
        let result = await user.validate()
        if (result)
            res.status(200).send('Success');
        else
            res.status(400).send('Invalid username or password');
    }
})

// Sign up route
router.post('/signup', async function (req, res) {
    if (!req.body.username || !req.body.password || !req.body.email)
        res.status(400).send()

    let user = new User(req.body.username, req.body.password, req.body.email);
    await user.save()

    res.status(200).send('Success');
})

export default router