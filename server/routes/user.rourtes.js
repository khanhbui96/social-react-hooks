const router = require('express').Router();
const passport = require('passport')
const userValidate = require('../middlewares/userValidate');
const userController = require('../controllers/user.controller');
const followController = require('../controllers/follow.controller');


router.post('/register',userValidate.registerValidate, userController.register);
router.post('/login',userValidate.loginValidate, userController.login);
router.get('/currentUser',passport.authenticate('jwt', {session: false}) , userController.getCurrentUser);
router.get('/',passport.authenticate('jwt', {session: false}) , userController.getUsers);
router.get('/profile/:userId',passport.authenticate('jwt', {session: false}) , userController.getProfile)
router.post('/search',passport.authenticate('jwt', {session: false}) , userController.searchUser)
router.get('/follow/:themId',passport.authenticate('jwt', {session: false}) , followController.follow)
router.get('/unFollow/:themId',passport.authenticate('jwt', {session: false}) , followController.unFollow)


module.exports =  router;