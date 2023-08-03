const express = require('express')
const router=express.Router()
const {login} = require("../Controllers/UserController")

/* router.get('/verify/:owner/:vtoken',UserController.verify); */
/* router.get('/verified',UserController.verified); */
router.post('/login',login)
module.exports= router; 
