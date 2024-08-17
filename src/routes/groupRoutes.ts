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

    this.router.post('/list', async (req: Request, res: Response) => {
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
        "/:id",
        async (
          req: Request,
          res: Response
        ) => {
          const groupname = decodeURIComponent(req.params.groupname);
          const group = await this.groupService.viewGroup(
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
  }
}

export default new GroupRoutes().router;
