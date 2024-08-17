import { Application } from "express";
import rootRoutes from "./rootRoutes";
import userRoutes from "./userRoutes";
import groupRoutes from "./groupRoutes";
import challengeRoutes from "./challengeRoutes";
import submissionRoutes from "./submissionRoutes";
import imageRoutes from "./imageRoutes";

export default class Routes {
  constructor(app: Application) {
    app.use("/", rootRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/group", groupRoutes);
    app.use("/api/challenge", challengeRoutes);
    app.use("/api/submission", submissionRoutes);
    app.use("/api/image", imageRoutes);
  }
}
