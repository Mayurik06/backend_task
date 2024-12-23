import express from 'express'
import { config } from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';
import dbConnection from './connection/dbConnection.js';

const app=express();
config({path:"./.env"})
const port=process.env.PORT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:['GET','PUT','PATCH','DELETE'],
    credentials:true
}))
app.options('*',cors());

dbConnection();

try{
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
}catch(err){
    console.log(err)
}