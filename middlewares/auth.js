const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User =require("../models/user");
 module.exports.checkUser=(req , res ,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET,async(err , decodedToken) =>{
            if(err){
                res.locals.User = null;
                res.cookie('jwt' , '', {maxAge:1});
                next();
            }else{
                console.log.apply('decoded token' + decodedToken);
                let user = await User.findById(decodedToken);
                res.locals.user = user ;
                console.log(res.locals.user);
                next();
            }
        })
    }else{
        res.locals.user =null;
        next();
    }
 }
 module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.send(200).json('no token')
        } else {
          console.log(decodedToken.id);
          next();
        }
      });
    } else {
      console.log('No token');
    }
  };

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

