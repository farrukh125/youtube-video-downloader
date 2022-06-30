import http from "http";
import express, { Request, Response } from "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import { SocketInit } from "./socket.io";

const app = express();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: "*" },
});

const port = 3000;

new SocketInit(io);

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    throw error;
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("ok");
});

server.listen(port, () => {
  console.log("Server is running on port:",`${port}`);
});
