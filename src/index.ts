import express, { Request, Response } from "express";
import env from "./config/environment";
import { initializeDatabase } from './config/database';

const app = express();
const port = env.PORT;

// Initialize database before starting server
initializeDatabase().then(() => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

