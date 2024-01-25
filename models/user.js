const mongoose =require('mongoose'); 
const bcrypt= require('bcryptjs'); 
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    userName: {
        type:String , 
        required:true, 
        unique:true},
    email:{
        type: String, 
        unique: true , 
    },
    password: {
        type:String,
        unique:true,
        required:true,},
    role :{
        type:String, 
        default:'customer',
    },
})
// Defining userSchema Methods 

// Compare user Password 
userSchema.methods.comparePassword = async function(entredPassword){
    return await  bcrypt.compare(entredPassword,this.password)
}
//return JWT token
userSchema.methods.getJwtToken= function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}



module.exports= mongoose.model('User', userSchema);