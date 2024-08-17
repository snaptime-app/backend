import { Application } from "express";
import userRoutes from "./userRoutes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/user", userRoutes);
  }
}
