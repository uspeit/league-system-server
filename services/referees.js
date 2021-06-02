import express from 'express';
const router = express.Router();

// Add referee route
router.post('/add', function (req, res) {
  // TODO
  res.status(200).send('Success');
})

export default router