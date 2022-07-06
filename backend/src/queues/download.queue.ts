import Bull from "bull";
import ytdl from "ytdl-core";
import fs from "fs";
import { Video } from "../models/video";
import { Events } from "../utils";
import { SocketInit } from "../socket.io";

const downloadQueue = new Bull("download queue", {
  redis: {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!),
    password: process.env.REDIS_PASSWORD,
  },
});
