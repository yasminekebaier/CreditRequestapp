const connectDatabase = require('../config/database')
const User = require('../models/user')
const  users=require('../Data/users.json')
const bcrypt =require('bcrypt')
// hash Password  function
const hashPassword= (pass)=>{
   try {
      const hashedPass= bcrypt.hash(pass, 10);
      return hashedPass
   }
   catch(err){
      console.log("error occured", err)
   }
  
}
// hash users password before seeding  
users.forEach  (async(user)=>{
   const hashedPassword= await hashPassword(user.password)
   user.password= hashedPassword; 
   EncryptedUsers.push(user); 
})

// create a db instance  
connectDatabase(); 
const seedUsers= async()=>{
   try {
    await User.deleteMany(); 
    console.log("All users are deleted successfully"); 
    await User.insertMany(users); 
    console.log("All users are inserted successfully"); 
   }
   catch(error){
    console.log(error.message)
    process.exit()
   }
}
seedUsers();  