import { Challenge, ChallengeDetail, Group } from "../types";
import { prisma } from "../util/prismaClient";

class ChallengeService {
  async createChallenge(userid: number, groupid: number, imagekey: string): Promise<any> {
    const newChallenge = await prisma.challenge.create({
      data: {
        groupId: groupid,
        authorId: userid,
        correctImage: imagekey
      }
    });
    return newChallenge;
  }

  async getChallenge(challengeId: number): Promise<ChallengeDetail> {
    const challenge = await prisma.challenge.findUnique({
      where: {
        id: challengeId,
      }, 
      include: 
      {submissions: true}
    });

    if (!challenge) {
      throw new Error(`Challenge with id ${challengeId} not found`);
    }

    return challenge;
  }
}

export default ChallengeService;
