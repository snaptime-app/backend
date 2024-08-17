import { User } from "../types";
import { prisma } from "../util/prismaClient";

class UserService {
  async createUser(newUserData: User): Promise<any> {
    const newUser = await prisma.user.create({
      data: newUserData,
    });
    return newUser;
  }
}

export default UserService;
