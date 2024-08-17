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

  async listGroups(userId: number): Promise<any> {
    const groups = await prisma.group.findMany({
      where: {
        GroupMembership: {
          some: {
            userId,
          },
        },
      },
    });

    return groups;
  }

  async updateGroup(username: string, groupid: number): Promise<any> {
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
            id: groupid,
          },
        },
      },
    });
    return updateGroup;
  }

  async viewGroup(groupid: number): Promise<any> {
    const groupMembers = await prisma.user.findMany({
      where: {
        GroupMembership: {
          some: {
            groupId: {
              equals: groupid,
            },
          },
        },
      },
      select: {
        id: true,
        username: true,
        GroupMembership: {
          select: {
            points: true,
          },
          where: {
            group: {
              id: {
                equals: groupid, // Ensure this matches the group name in the where clause
              },
            },
          },
        },
      },
    });
    console.log(groupMembers);
    return groupMembers;
  }
}

export default GroupService;
