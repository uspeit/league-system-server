import express from 'express';
const router = express.Router();

// Schedule game route
router.post('/schedule', function (req, res) {
  // TODO
  res.status(200).send('Success');
})

export default router