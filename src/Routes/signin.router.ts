import express, { Request, Response } from "express";
import { client, userCollection } from "../services/database.service";
import { autenticate } from "../utils/autenticate";

export const signin = express.Router();

signin.use(express.json());

signin.post('/', async (req: Request, res: Response) =>{
    try {
        await client.connect().then(async ()=>{
            const query = await userCollection.find({user: req.body.user}).toArray();
            if(query[0] !== undefined){
                if(req.body.user === query[0].user && req.body.password === query[0].password){
                    const signatureUrl = autenticate(req.body.user, req.body.password);
                    res.status(202).json({
                        token: signatureUrl,
                    });
                }else{
                    res.status(406).json({
                        message: 'Senha incorreta',
                    });
                }
            }else{
                res.status(401).json({
                    message: 'Usuario não existe',
                });
            }
        });
    } catch (error) {
        console.error(error)
    } 
});
