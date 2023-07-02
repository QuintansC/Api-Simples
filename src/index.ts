import express from "express";
import cors from 'cors';
import { users } from "@/routes/users.router";
import { home } from "@/routes//home.router";
import { signup } from "@/routes//signup.router";
import { signin } from "@/routes//signin.router";
import { create as createWorkspace } from "@/routes//createworkspace.router";
import { categoriesRouter } from "@/routes//categories.router";

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