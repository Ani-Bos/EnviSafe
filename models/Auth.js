// const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

  const UserSchema = new Schema({
      
   name:{type:String,
   required:true
   },
   isadmin:{
    type:Boolean,
    default:false
   },
   email:{
       type:String,
       required:true
    //    ,unique:true
   },
   phone:{
    type:Number,
    default:0
   },
   address:{
    type:String,
    default:""
   },
   createdAt:{
       type:Date,
       default:Date.now
   }
  },{ timestamps: true});
  const User=mongoose.model('user',UserSchema);
  
  module.exports=User;
