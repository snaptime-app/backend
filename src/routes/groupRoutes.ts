import { Router, Request, Response } from "express";
import GroupService from "../services/groupService";

class GroupRoutes {
  router = Router();
  groupService = new GroupService();

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
          const newGroup = await this.groupService.createGroup(
            req.body.username,
            req.body.groupname
          );
          res.json(newGroup);
        }
      );

      this.router.post(
        "/update",
        async (
          req: Request,
          res: Response
        ) => {
          const updatedGroup = await this.groupService.updateGroup(
            req.body.username,
            req.body.groupname
          );
          res.json(updatedGroup);
        }
      );

      this.router.get(
        "/get",
        async (
          req: Request,
          res: Response
        ) => {
          const group = await this.groupService.viewGroup(
            req.body.groupname
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
