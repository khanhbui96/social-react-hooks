const router = require('express').Router();
const controllers = require('../controllers/interactive.controllers')
const passport = require('passport');

router.post('/:postId/like', passport.authenticate('jwt', {session: false}),controllers.like);
router.post('/:postId/love',passport.authenticate('jwt', {session: false}), controllers.love);
router.post('/:postId/dislike',passport.authenticate('jwt', {session: false}) ,controllers.dislike)

module.exports = router