import express, { NextFunction, Request, Response } from "express";
import { json } from 'body-parser';
import todoRoutes from "./routes/todo";

const app = express();

app.use(json());

app.use('/todo', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({ error: err.message });
})

app.listen("3000");
