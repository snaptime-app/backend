import { Router, Request, Response } from "express";
import SubmissionService from "../services/submissionService";
import UserService from "../services/userService";
import { rateLimiter } from "../util/rateLimit";

class SubmissionRoutes {
  router = Router();
  submissionService = new SubmissionService();
  userService = new UserService();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post(
      "/create",
      rateLimiter,
      async (
        req: Request,
        res: Response
      ) => {
        const user = await this.userService.getUser(req.get('Authorization'));
        const submission = await this.submissionService.createSubmission(
          user.id,
          req.body.challengeid,
          req.body.imagekey,
          `${req.protocol}://${req.get("Host")}`,
        );
        res.json(submission);
      }
    )
  }
}

export default new SubmissionRoutes().router;
