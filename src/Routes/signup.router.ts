import express, { Request, Response } from "express";
import { client, userCollection } from "../services/database.service";

export const signup = express.Router();

signup.use(express.json());

signup.post('/', async (req: Request, res: Response) =>{
    try{
        await client.connect().then(async ()=>{
            const query = await userCollection.find({user: req.body.user}).toArray();
            const queryEmail = await userCollection.find({email: req.body.email}).toArray();
            if(query[0] === undefined && queryEmail[0] === undefined){
                console.log(req.body)
                if(req.body.user !== '' && req.body.password !== '' && req.body.email !== '' ){
                    userCollection.insertOne({
                        email: req.body.email,
                        user: req.body.user,
                        password: req.body.password
                    })
                    res.status(201).json({
                        message: 'Cadastrado com sucesso!',
                    });
                }else{
                    res.status(406).json({
                        message: 'Campos vazios nao sao permitidos',
                    });
                }
            }
            else{
                res.status(401).json({
                    message: "Usuario ja existente",
                })
            }
        })
    }catch (error){
        //console.error('erro');
    }
})