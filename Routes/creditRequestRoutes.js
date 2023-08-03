const express = require('express')
const {isAuthenticatedUser, authorizedRoles}=require('../middlewares/auth') 

var router=express.Router()
const {registerRequest, getAllRequests,getRequestById} = require("../Controllers/creditRequestController")

//routes  
router.route('/creditRequest/new',isAuthenticatedUser).post(registerRequest); 
router.route('/creditRequest/show',isAuthenticatedUser,authorizedRoles('agent')).get(getAllRequests)
router.route('/creditRequest/show/:id',isAuthenticatedUser,authorizedRoles('agent')).get(getRequestById)

module.exports= router; 
