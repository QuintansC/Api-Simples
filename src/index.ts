import { createServer } from "./utils/createServer";

const port = process.env.PORT || 3000;
const app = createServer()

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
