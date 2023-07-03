
import express, { Request, Response } from "express";

export const home = express.Router();

home.use(express.json());
home.get('/',  (req: Request, res: Response) =>{
    try{
        res.status(200).send({message: "Success"})
    }
    catch (error) {
        res.status(400).send({ message: req })
    }
})
