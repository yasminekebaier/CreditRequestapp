const express = require('express')
const {isAuthenticatedUser, authorizedRoles}=require('../middlewares/auth') 

var router=express.Router()
const {registerRequest, getAllRequests,getRequestById,updateRequestById} = require("../Controllers/creditRequestController")

//routes  
router.route('/creditRequest/new',isAuthenticatedUser).post(registerRequest); 
router.route('/creditRequest/show',isAuthenticatedUser,authorizedRoles('agent')).get(getAllRequests)
router.route('/creditRequest/show/:id',isAuthenticatedUser,authorizedRoles('agent')).get(getRequestById)
router.route('/creditRequest/update/:id',isAuthenticatedUser, authorizedRoles('agent')).get(updateRequestById)

module.exports= router; 
