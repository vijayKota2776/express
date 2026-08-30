const mongoose=require('mongoose');

const adminSchema={

    adminName:{
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

    role:{
        type:String,
        enum:['superadmin', 'moderator', 'editor'],
        default:'editor'
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }
};

const Admin= new mongoose.model('Admin', adminSchema);

module.exports=Admin