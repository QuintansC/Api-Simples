import { MongoClient, Collection } from "mongodb";
import * as dotenv from 'dotenv'

dotenv.config();
export const client = new MongoClient(process.env.CUSTOMCONNSTR_DB_CONN_STRING ? process.env.CUSTOMCONNSTR_DB_CONN_STRING: '');
export const userCollection: Collection = client.db(process.env.CUSTOMCONNSTR_DB_NAME).collection(process.env.CUSTOMCONNSTR_LOGIN_COLLECTION_NAME ? process.env.CUSTOMCONNSTR_LOGIN_COLLECTION_NAME:'');
export const workspacesCollection: Collection = client.db(process.env.CUSTOMCONNSTR_DB_NAME).collection('workspaces');
export const categoriesCollection: Collection = client.db(process.env.CUSTOMCONNSTR_DB_NAME).collection('categories');
