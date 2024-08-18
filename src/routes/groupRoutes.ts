import { Router, Request, Response } from 'express';
import GroupService from '../services/groupService';
import UserService from '../services/userService';

class GroupRoutes {
  router = Router();
  groupService = new GroupService();
  userService = new UserService();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post('/create', async (req: Request, res: Response) => {
      const user = await this.userService.getUser(req.get('Authorization'));
      const newGroup = await this.groupService.createGroup(
        user.username,
        req.body.groupname,
      );
      res.json(newGroup);
    });

    this.router.get('/list', async (req: Request, res: Response) => {
      const user = await this.userService.getUser(req.get('Authorization'));
      const groupList = await this.groupService.listGroups(
        user.id,
      );
      res.json(groupList);
    });

    this.router.post('/:groupid/adduser', async (req: Request, res: Response) => {
      const updatedGroup = await this.groupService.updateGroup(
        req.body.username,
        parseInt(req.params.groupid),
      );
      res.json(updatedGroup);
    });

    this.router.get(
      "/groupdetails/:id",
      async (
        req: Request,
        res: Response
      ) => {
        const groupDetails = await this.groupService.viewGroupDetails(
          parseInt(req.params.id),
        );
        res.json(groupDetails);
      }
    );

    this.router.get(
      "/get-members/:id",
      async (
        req: Request,
        res: Response
      ) => {
        const group = await this.groupService.viewGroupMembers(
          parseInt(req.params.id),
        );
        const transformedData = group.map((person: { id: any; username: any; GroupMembership: { points: any; }[]; }) => ({
          user_id: person.id,
          username: person.username,
          points: person.GroupMembership[0].points
        }));
        res.json(transformedData);
      }
    );

    this.router.get(
      "/getchallenges/:groupid",
      async (
        req: Request,
        res: Response
      ) => {
        const user = await this.userService.getUser(
          req.get("Authorization"),
        );
        const challenges = await this.groupService.viewChallenges(
          user.id,
          parseInt(req.params.groupid)
        );
        const challengesWithCompletionStatus = challenges.map((challenge: { id: any; createdAt: any; correctImage: any; author: { username: any; id: any }; submissions: string | any[]; }) => ({
          id: challenge.id,
          createdAt: challenge.createdAt,
          correctImage: challenge.correctImage,
          author: challenge.author.username,
          isowner: (challenge.author.id == user.id),
          completed: challenge.submissions.length > 0, // If there are any submissions, the challenge is considered completed
        }));
        res.json(challengesWithCompletionStatus);
      }
    );
  }
}

export default new GroupRoutes().router;
