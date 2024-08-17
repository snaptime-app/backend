import { CreateUser, User } from "../types";
import { prisma } from "../util/prismaClient";

class UserService {
  async createUser(username: string, session: string): Promise<any> {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        session: session,
      }
    });
    return newUser;
  }
}

export default UserService;
