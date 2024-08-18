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

  async getUser(session: string | undefined): Promise<any> {
    const user = await prisma.user.findUnique({
      where: {
        session: session,
      },
    });
    return user;
  }

  async getAllUsers(): Promise<any[]> {
    const users = await prisma.user.findMany({
      select: {
        username: true,
        GroupMembership: {
          select: {
            userId: true,
            points: true,
            groupId: true, // Adjust this based on your actual schema
          }
        },
      }
    });

    return users;
  }
}

export default UserService;
