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

    this.router.post('/update', async (req: Request, res: Response) => {
      const updatedGroup = await this.groupService.updateGroup(
        req.body.username,
        req.body.groupname,
      );
      res.json(updatedGroup);
    });

    this.router.get('/get', async (req: Request, res: Response) => {
      const group = await this.groupService.viewGroup(req.body.groupname);
      res.json(group);
    });
  }
}

export default new GroupRoutes().router;
