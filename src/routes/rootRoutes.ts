import { Router, Request, Response } from "express";
import UserService from "../services/userService";

class RootRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", async (req: Request, res: Response): Promise<Response> => {
      return res.json({ message: "Jeffery says hi!" });
    });
  }
}

export default new RootRoutes().router;
