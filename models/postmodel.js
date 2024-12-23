import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'userid is missing']
    },
    postName:{
        type:String,
        required:[true,'Post name is missing']
    },
description:{
    type:String,
},
uploadTime:{
    type:Date,
    default:Date.now
},
tags:{
    type:[String],
},
imageUrl:{
    type:String,
    required:true
}
});

const Post=mongoose.model("Post",postSchema);
export default Post;