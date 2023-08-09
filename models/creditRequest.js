const mongoose =require('mongoose'); 

 const  creditRequestSchema=new mongoose.Schema({
    name: {
        type :String, 
        required : [true, 'name required'], 
        maxlength:[30, 'max length 30 '],
    },
    surname : {
        type :String, 
        required : [true, 'name required'], 
        maxlength:[30, 'max length 30 '],
    },
    cin_number:{
        type : Number , 
        required:true,
    },
        
     city:{
        type : String, 
        required: true , 
     }, 
     address : {
        type:String , 
        required : true , 
     }, 
     zipCode:{
        type: Number, 
        required: true , 
     },
     phone_number: {
        type: Number ,
        required:true, 
             },  
    email :{
        type :String , 
        required:true, 
    },
    birth_date: {
        type :Date ,
        required :true , 
    } , 
    status: {
        type: String,
        required:true,
        Default:"Deny"
    }

 }) 
 module.exports= mongoose.model('CreditRequest',creditRequestSchema )


 // // validate: {
        // //     validator: function(cin_number){
        // //         return cin_number.length==8
        // //     },
        // },