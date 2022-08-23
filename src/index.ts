import express from "express";
import { users } from "./Routes/users.router";

import { signup } from "./Routes/signup.router";
import { signin } from "./Routes/signin.router";

const app = express()
const port = 5000

//app.use("/", login);

app.use("/signup", signup);
app.use("/signin", signin);
app.use("/getUsers", users);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});