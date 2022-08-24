
import express from "express";

export const home = express.Router();

home.use(express.json());
home.get('/',  () =>{
    try{
        console.log('hi')
    }
    catch (error) {
        console.error(error)
    }
})
