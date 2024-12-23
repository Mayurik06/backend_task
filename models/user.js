import mongoose from "mongoose";
import validator from 'validator';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
          }
    },
    password:{
        type:String
    }
})


const User=mongoose.model('User',userSchema);

export default User;