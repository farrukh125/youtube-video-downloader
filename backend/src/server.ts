import { config } from "dotenv";
config();
import http from "http";
import express, { Request, Response } from "express";
import { Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import { SocketInit } from "./socket.io";
import { downloadsRouter } from "./routes/downloads";

const app = express();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: "*" },
});

const port = 3000;

new SocketInit(io);

mongoose.connect(process.env.MONGO_DB, {
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
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));
app.use(cors());
app.use(downloadsRouter);

app.get("/", (req: Request, res: Response) => {
  //res.status(200).send("ok");
  res.render("index");
});

// io.on("connection", (socket: Socket) => {
//  console.log("A user connected");
//  Socket.on("disconnect", () => {
//    console.log("user disconnected");
//  });
// });

server.listen(port, () => {
  console.log("Server is running on port:", `${port}`);
});
