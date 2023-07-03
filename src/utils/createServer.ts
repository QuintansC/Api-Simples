import express from "express";
import { users } from "../Routes/users.router";
import { home } from "../Routes/home.router";
import { signup } from "../Routes/signup.router";
import { signin } from "../Routes/signin.router";
import { create as createWorkspace } from "../Routes/createworkspace.router";
import { categoriesRouter } from "../Routes/categories.router";

import cors from 'cors';

function createServer() {
    const app = express()
    app.use(cors())
    app.use(express.json())

    app.use("/", home);
    app.use("/signup", signup);
    app.use("/signin", signin);
    app.use("/getUsers", users);
    app.use("/createWorkspace", createWorkspace);
    app.use("/categories", categoriesRouter)
    return app
}

export { createServer }