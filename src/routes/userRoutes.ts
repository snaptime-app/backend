import { Router, Request, Response } from "express";
import UserService from "../services/userService";

class UserRoutes {
  router = Router();
  userService = new UserService();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", async (req: Request, res: Response): Promise<Response> => {
      return res.json({ message: "It works!" });
    });

    this.router.post(
      "/create",
      async (
        req: Request,
        res: Response
      ): Promise<Response> => {
        console.log(req.body)
        const newUser = this.userService.createUser(
          req.body.username,
          req.body.session,
        );
        return res.json(newUser);
      }
    );
  }
}

export default new UserRoutes().router;
