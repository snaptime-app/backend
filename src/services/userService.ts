import { CreateUser, User } from "../types";
import { prisma } from "../util/prismaClient";

class UserService {
  async createUser(newUserData: CreateUser): Promise<any> {
    const newUser = await prisma.user.create({
      data: newUserData,
    });
    return newUser;
  }
}

export default UserService;
