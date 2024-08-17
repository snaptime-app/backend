import { Application } from "express";
import rootRoutes from "./rootRoutes";
import userRoutes from "./userRoutes";
import groupRoutes from "./groupRoutes";

export default class Routes {
  constructor(app: Application) {
    app.use("/", rootRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/group", groupRoutes);
  }
}
