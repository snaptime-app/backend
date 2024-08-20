import { Router, Request, Response } from "express";
import { rateLimiter } from "../util/rateLimit";

class RootRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", async (req: Request, res: Response): Promise<Response> => {
      return res.json({ message: "Jeffery says hi!" });
    });

    this.router.get("/rate-limited", rateLimiter(10, 3), async (req: Request, res: Response): Promise<Response> => {
      return res.status(200).json({ message: "Hello from a rate-limited endpoint!" })
    });
  }
}

export default new RootRoutes().router;
