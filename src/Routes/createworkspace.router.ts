import express, { Request, Response } from "express";
import { client, workspacesCollection } from "../services/database.service";

export const create = express.Router();
create.use(express.json());
create.post('/', async (req: Request, res: Response) =>{
    try {
        await client.connect().then(async ()=>{
            const query = await workspacesCollection.find({userID: req.body.userID}).toArray();
            const queryEmail = await workspacesCollection.find({nameProject: req.body.nameProject}).toArray();
            if(query[0] === undefined && queryEmail[0] === undefined){
                if(req.body.userID !== '' && req.body.nameProject !== '' && req.body.description !== '' ){
                    workspacesCollection.insertOne({
                        userID: req.body.userID,
                        nameProject: req.body.nameProject,
                        description: req.body.description,
                    })
                    res.status(201).json({
                        message: 'Projeto cadastrado com sucesso!',
                    });
                }else{
                    res.status(406).json({
                        message: 'Houve algum erro',
                    });
                }
            }else{
                res.status(404).json({
                    message: "Não foi possivel criar"
                })
            }
        });
    } catch (error) {
        console.error(error)
    }
});