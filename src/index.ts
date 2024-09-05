import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS?.split(",") : ["*"];

    app.use((req, res, next) => {
      const origin = req.headers.origin;
      console.log("Coming from:", origin)
      console.log("Allowed:", allowedOrigins)
      const acceptedOrigin = (allowedOrigins.indexOf(origin!) >= 0) ? origin : allowedOrigins[0];
      res.header("Access-Control-Allow-Origin", acceptedOrigin);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      next();
    });

    app.use("/uploads", express.static("uploads"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
