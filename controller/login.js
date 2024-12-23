import bcrypt from 'bcryptjs'
import User from "../models/user.js";

export const login=async(req,res)=>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required', success:false });
          }

          const user=await User.findOne({email});
          if(!user){
            return res.status(404).json({message:"User not found", success:false})
          }

          const isPasswordValid =await bcrypt.compare(password,user.password);
          if(!isPasswordValid){
            return res.status(401).json({message:"Invalid password", success:false}) ;
          }

          return res.status(200).json({message:"Login successfull", success:true});
    } catch (error) {
        return res.json(500).json({message:'internal server error', error:error.message})
    }
}