const catchAsyncErrors= require('../middlewares/catchAsyncErrors');
const  ErrorHandler= require('../utils/errorHandler');
const User =require( '../models/user'); 
const {sendToken}= require('../utils/jwtToken')

// get All users 
module.exports.get= async(req,res)=>{
    const users= await UserModel.find()
    res.send(users)  
}
// Login user => /login 
exports.login = catchAsyncErrors(async (req, res, next) => {
  const {
      userName,
      password
  } = req.body;
  // check if  credentials are entred by user 
  if (!userName || !password) {
      return next(new ErrorHandler('please  enter your userName & your password', 400));
  }
  //finding user in dataBase
  const user = await User.findOne({
      userName
  }).select('+password');
  
  if (!user) {
      return next(new ErrorHandler('Invalid Email or Password', 401));
  }
  //checks if pasword is correct or not 
  
  const isPasswordMatched = await user.comparePassword(password);
  
  if (!isPasswordMatched) {
      return next(new ErrorHandler('Invalid Password', 401));
  }
  sendToken(user, 200, res);

  });