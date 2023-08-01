const express = require('express')
const router=express.Router()
const UserController = require("../Controllers/UserController")
router.get('/',UserController.get)
/* router.get('/verify/:owner/:vtoken',UserController.verify); */
/* router.get('/verified',UserController.verified); */
router.post('/signIn',UserController.signIn)
module.exports= router; 
