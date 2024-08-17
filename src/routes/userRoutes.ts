import { Router } from "express";
import { test } from "../services/userService";

class UserRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", test);
  }
}

export default new UserRoutes().router;
