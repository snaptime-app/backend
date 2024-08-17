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
  
  async getUser(session: string|undefined): Promise<any> {
    console.log(session)
    const user = await prisma.user.findUnique({
      where: {
        session: session,
      },
    });
    return user;
  }
}

export default UserService;
