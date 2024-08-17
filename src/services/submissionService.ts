import { Group } from "../types";
import { prisma } from "../util/prismaClient";

class SubmissionService {
  async createSubmission(userid: number, challengeid: number): Promise<any> {
    console.log(challengeid)
    const newSubmission = await prisma.submission.create({
      data: {
        isCorrect: true,
        challengeId: challengeid,
        creatorId: userid,
    }});
    return newSubmission;
  }
}

export default SubmissionService;
