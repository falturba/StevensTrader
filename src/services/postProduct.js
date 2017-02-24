import express from 'express';
import authenticate from '../middlewares/authenticate';

let router = express.Router();

router.post('/postproduct', authenticate, (req, res) => {
  res.status(201).json({ success: true });
});

//export default router;
module.exports = router;