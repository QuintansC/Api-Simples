import express, { Response, Request } from "express";
import { client, categoriesCollection } from "../services/database.service";

export const categoriesRouter = express.Router();

categoriesRouter.use(express.json());

categoriesRouter.get('/', async (req: Request, response: Response) =>{
    try {
        req
        await client.connect().then(async ()=>{
            const query = await categoriesCollection.find().toArray()
            response.status(200).json(query)
            
        });
    } catch (error) {
        response.status(404).send(error)
    }
});