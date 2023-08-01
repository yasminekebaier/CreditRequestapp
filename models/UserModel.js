const mongoose =require('mongoose'); 
const RoleSchema = new mongoose.Schema({

    name : {type : String , required : true , default : "userRole"}
})

const UserSchema = mongoose.Schema({
    Username: {
        type:String , 
        required:true, 
        unique:true},
    password: {
        type:String,
        unique:true,
        required:true,},
    role :RoleSchema,

})
module.exports= mongoose.model('User', UserSchema);