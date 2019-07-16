const router = require('express').Router();
const controller = require('../controllers/post.controllers')
const passport = require('passport')

router.post('/add', passport.authenticate('jwt', {session: false}) ,controller.add )
router.get('', passport.authenticate('jwt', {session: false}) , controller.getPosts )
router.get('/:profileId', passport.authenticate('jwt', {session: false}) , controller.getPostsById )

module.exports = router