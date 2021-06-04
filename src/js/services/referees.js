import express from 'express';
const router = express.Router();

// Add referee route
router.post('/add', function (req, res) {
  // TODO
  res.status(200).send({
    userRole: req.user.role
  });
})

export default router