const express = require('express')
const router=express.Router()
const {login,logout} = require("../Controllers/UserController")


router.post('/login',login)
router.post('/logout', logout); // New route for logout
module.exports= router; 
