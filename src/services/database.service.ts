import { MongoClient, Collection } from "mongodb";
import * as dotenv from 'dotenv'

dotenv.config();
export const client = new MongoClient(process.env.DB_CONN_STRING?process.env.DB_CONN_STRING: '');
export const userCollection: Collection = client.db(process.env.DB_NAME).collection(process.env.LOGIN_COLLECTION_NAME?process.env.LOGIN_COLLECTION_NAME:'');
export const workspacesCollection: Collection = client.db(process.env.DB_NAME).collection('workspaces');
