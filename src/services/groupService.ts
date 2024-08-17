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

  async viewGroup (groupname: string): Promise<any> {
    const groupMembers = await prisma.user.findMany({
        where: {
          GroupMembership: {
            some: {
              group: {
                name: groupname, // Replace with the actual group name
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
                name: groupname, // Ensure this matches the group name in the where clause
              },
            },
          },
        },
      });
      console.log(groupMembers)
    return groupMembers;
  }
}

export default GroupService;
