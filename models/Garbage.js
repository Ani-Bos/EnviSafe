
const mongoose = require('mongoose');

const { Schema } = mongoose;

  const GarbageSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    filename:{
        type:Array,
        required:true
    },
    fileid:{
        type:Array,
        required:true
    },
    category:{
        type:Array,
        required:true
    },
    type:{
        type:Array,
        required:true
    },
 weight:{
    type:Number,
    required:true
 },
   createdAt:{
       type:Date,
       default:Date.now
   }
  },{ timestamps: true});
  const Garbage=mongoose.model('garbagedata',GarbageSchema);
  
  module.exports=Garbage;
