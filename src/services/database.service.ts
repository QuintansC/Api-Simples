import { MongoClient, Collection } from "mongodb";
import * as dotenv from 'dotenv'

dotenv.config();

const URL_DB = process.env.DB_LOGIN ? `mongodb+srv://${process.env.DB_LOGIN}/?retryWrites=true&w=majority`: '';
export const client = new MongoClient(URL_DB);
export const userCollection: Collection = client.db(process.env.DB_NAME).collection(process.env.LOGIN_COLLECTION ? process.env.LOGIN_COLLECTION:'');
export const workspacesCollection: Collection = client.db(process.env.DB_NAME).collection('workspaces');
export const categoriesCollection: Collection = client.db(process.env.DB_NAME).collection('categories');
