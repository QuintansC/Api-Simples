import express, { Request, Response } from "express";
import { client, userCollection } from "../services/database.service";
import { ObjectId } from "mongodb";

export const users = express.Router();

users.use(express.json());

users.get('/:user', async (req: Request, res: Response) => {
    try {
        await client.connect().then(async ()=>{
            const query = { _id: new ObjectId(req.params.user)}
            const users = await userCollection.findOne(query);
            if(users){
                res.status(200)
                .json({
                    id: users._id,
                    user: users.user
                })
            }else{
                res.status(404).json({
                    message: "Busca sem sucesso"
                })
            }
        })
    } catch (error) {
        console.error(error)
    }
     
});
