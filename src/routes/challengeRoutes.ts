import { Router, Request, Response } from "express";
import ChallengeService from "../services/challengeService";
import UserService from "../services/userService";

class ChallengeRoutes {
  router = Router();
  challengeService = new ChallengeService();
  userService = new UserService();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get(
      "/create/:groupid",
      async (
        req: Request,
        res: Response
      ) => {
        const user = await this.userService.getUser(req.get('Authorization'));
        const challenge = await this.challengeService.createChallenge(
          user.id,
          parseInt(req.params.groupid)
        );
        res.json(challenge)
      }
    )
  }
}

export default new ChallengeRoutes().router;
