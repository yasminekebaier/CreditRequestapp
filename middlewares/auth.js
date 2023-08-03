const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User =require("../models/user"); 

//we will check if user is authenticated or not (routes security)
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const {
        token
    } = req.cookies;
    if (!token) {
        return next(new ErrorHandler('Login first to access ressource ', 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);
    next()
})

//handling users roles
exports.authorizedRoles= (...roles)=>{
    return(req,res,next )=>{
        if (!roles.includes(req.user.role)){
          return  next(new ErrorHandler(`Role(${req.user.role}) is not allowed`,403))
        }
        next(); 
    }
}

