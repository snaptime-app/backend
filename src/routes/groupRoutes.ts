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

    this.router.post('/:id/adduser', async (req: Request, res: Response) => {
      const updatedGroup = await this.groupService.updateGroup(
        req.body.username,
        parseInt(req.params.id),
      );
      res.json(updatedGroup);
    });

      this.router.get(
        "/get-members/:id",
        async (
          req: Request,
          res: Response
        ) => {
          const group = await this.groupService.viewGroupMembers(
            parseInt(req.params.id),
          );
          const transformedData = group.map((person: { id:any; username: any; GroupMembership: { points: any; }[]; }) => ({
            user_id: person.id,
            username: person.username,
            points: person.GroupMembership[0].points
          }));
          res.json(transformedData);
        }
      );

      this.router.get(
        "/get-challenges/:groupid",
        async (
          req: Request,
          res: Response
        ) => {
          const challenges = await this.groupService.viewChallenges(
            parseInt(req.params.groupid),
          );
          res.json(challenges);
        }
      );
  }
}

export default new GroupRoutes().router;
