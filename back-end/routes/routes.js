const router = require('express').Router();
const authRouter = require('./authRouter.js');

router.use('/user', authRouter)

module.exports = router;

