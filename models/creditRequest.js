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
        // required: true , 
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
        type :String ,
        required :true , 
    } , 
    job: {
        type: String,
        required:true,
        Default:"Deny"
    },
    motherName: {
        type: String,
        required:true,
        Default:"Deny"
    },
    NID_creation_date:{
        type:String,
        required:true ,
    },


    status: {
        type: String,
        required:true,
        Default:"Deny"
    }, 
    amount: {
        type: Number,
        required:true,
        Default:"Deny"
    }, 
    month: {
        type: String,
        required:true,
        Default:0
    },
    owner:{
        type:String, 
        required: true, 

    }



 }) 
 module.exports= mongoose.model('CreditRequest',creditRequestSchema )


