import { Router, Request, Response } from "express";
import UserService from "../services/userService";

class UserRoutes {
  router = Router();
  userService = new UserService();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post(
      "/create",
      async (
        req: Request,
        res: Response
      ) => {
        const newUser = await this.userService.createUser(
          req.body.username,
          req.body.session,
        );
        res.json(newUser);
      }
    );

    this.router.get(
      "/get",
      async (
        req: Request,
        res: Response
      ) => {
        const user = await this.userService.getUser(
          req.get("Authorization"),
        );
        res.json(user)
      }
    )

    this.router.get(
      "/all",
      async (
        req: Request,
        res: Response
      ) => {
        const users = await this.userService.getAllUsers();
        res.json(users);
      }
    );
  }
}

export default new UserRoutes().router;
