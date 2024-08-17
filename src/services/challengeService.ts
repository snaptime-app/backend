import { Group } from "../types";
import { prisma } from "../util/prismaClient";

class ChallengeService {
  async createChallenge(userid: number, groupid: number): Promise<any> {
    const newChallenge = await prisma.challenge.create({
      data: {
        groupId: groupid,
        authorId: userid,
    }});
    return newChallenge;
  }
}

export default ChallengeService;
