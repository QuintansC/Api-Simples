import express from "express";
import cors from 'cors';
import { users } from "./Routes/users.router";
import { home } from "./Routes/home.router";
import { signup } from "./Routes/signup.router";
import { signin } from "./Routes/signin.router";
import { create as createWorkspace } from "./Routes/createworkspace.router";
import { categoriesRouter } from "./Routes/categories.router";

const app = express()
const port = 5000

app.use(cors())

app.use("/", home);
app.use("/signup", signup);
app.use("/signin", signin);
app.use("/getUsers", users);
app.use("/createWorkspace", createWorkspace);
app.use("/categories", categoriesRouter)

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});