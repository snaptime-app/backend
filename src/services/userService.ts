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

  async getAllUsers(): Promise<any[]> {
    const users = await prisma.user.findMany({
      include: {
        GroupMembership: true,
      },
    });

    return users.map(user => ({
      username: user.username,
      GroupMembership: user.GroupMembership,
    }));
  }
}

export default UserService;
