import express, {Request, Response} from "express";
import env from "./config/environment";
const app = express();

const port = env.PORT;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

