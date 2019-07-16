const router = require('express').Router();
const  controller = require('../controllers/msg.controllers');
const passport = require('passport');

router.post('/send', passport.authenticate('jwt', {session: false}),controller.giveMsg );
router.get('/', passport.authenticate('jwt', {session: false}),controller.getAllMsgs);
router.get('/:id', passport.authenticate('jwt', {session: false}),controller.getMsgsById);

module.exports = router