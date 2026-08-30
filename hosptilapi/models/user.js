const mongose=require('mongoose');

const userSchema={
   
    username:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    
    password:{
        type:String,
        required:true,
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }
};

const User= new mongose.model('User', userSchema);

module.exports=User