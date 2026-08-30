const mongoose = require ('mongoose');

const hosptialSchema={
    name:{
        type:String,
        required: true,
        unique: true
    },
    city:{
        type:String,
        require:true,
        unique: true
    },
    totalbeds:{
        type:Number,
        require: true
    },
    availablebeds: {
        type: Number,
        require: true
    }
};

const hosptial = new mongoose.model('hosptial', hosptialSchema);

module.exports=hosptial