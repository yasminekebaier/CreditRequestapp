const mongoose =require('mongoose'); 


 const  creditRequestSchema=new mongoose.Schema({
    // Personal info 
    client_name: {
        type :String, 
        required : [true, 'name required'], 
        maxlength:[30, 'max le,gth 30 '],
    },
    client_surname : {
        type :String, 
        required : [true, 'name required'], 
        maxlength:[30, 'max le,gth 30 '],
    },
    national_cardNumber:{
        type : String , 
        validate: {
            validator: function(cardNumber){
                return cardNumber.length==8
            },
        message : 'card number length exactly 8 digits'
        },
    address : {
       type:String , 
       required : true , 
    //   add staff for validation 
    }, 
    birth_date: {
        type :Date ,
        required :true , 
    } , 
 //Employement and income details 
 Employement_status : {
    type: String ,
    //  add validation 
    validate : function( ){
    }
 }

    
    }
 }) 