import express, { Request, Response, NextFunction, request } from "express";
import fs from "fs/promises";
import { Video } from "../models/video";
const downloadsRouter = express.Router();

downloadsRouter.get(
  "/api/downloads",
  async (req: Request, res: Response, next: NextFunction) => {
    const videos = await Video.find().sort({ createAt: -1 });
    res.status(200).send(videos);
  }
);

downloadsRouter.get(
  "/api/downloads/:id/downloadfile",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      res.status(404).send("Video not found");
    }
    const { file } = video;

    res.status(200).download(file);
  }
);

downloadsRouter.post(
  "/api/downloads",
  body("youtubeUrl").isURL(),
  async (req: Request, res: Response, next: NextFunction) => {
    // Will implement
  }
);

downloadsRouter.delete(
  "/api/downloads/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const video = await Video.findyByIdAndDelete(id);

    if (video) {
      await fs.unlink(video.file!);
    }
  }
);
