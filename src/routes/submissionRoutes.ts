import { Router, Request, Response } from "express";
import SubmissionService from "../services/submissionService";
import UserService from "../services/userService";

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
      async (
        req: Request,
        res: Response
      ) => {
        const user = await this.userService.getUser(req.get('Authorization'));
        const submission = await this.submissionService.createSubmission(
          user.id,
          req.body.challengeid,
          req.body.imagekey,
          `${req.protocol}://${req.hostname}`,
        );
        res.json(submission);
      }
    )
  }
}

export default new SubmissionRoutes().router;
