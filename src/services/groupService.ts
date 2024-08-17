import { Group } from '../types';
import { prisma } from '../util/prismaClient';

class GroupService {
  router: any;
  async createGroup(username: string, groupname: string): Promise<any> {
    const newGroup = await prisma.group.create({
      data: {
        name: groupname,
        GroupMembership: {
          create: [
            {
              points: 0,
              user: {
                connect: {
                  username: username,
                },
              },
            },
          ],
        },
      },
    });
    return newGroup;
  }

  async updateGroup(username: string, groupname: string): Promise<any> {
    const updateGroup = await prisma.groupMembership.create({
      data: {
        points: 0,
        user: {
          connect: {
            username: username,
          },
        },
        group: {
          connect: {
            name: groupname,
          },
        },
      },
    });
    return updateGroup;
  }

  async viewGroup(groupname: string): Promise<any> {
    const group = await prisma.group.findUnique({
      where: {
        name: groupname,
      },
      include: {
        GroupMembership: {
          include: {
            user: true,
          },
        },
      }
    });
    return group;
  }
}

export default GroupService;
