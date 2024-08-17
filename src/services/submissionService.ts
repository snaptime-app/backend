import { Group } from "../types";
import { prisma } from "../util/prismaClient";

class SubmissionService {
  async createSubmission(userid: number, challengeid: number, attemptedimageid: string): Promise<any> {
    console.log(challengeid)
    const newSubmission = await prisma.submission.create({
      data: {
        isCorrect: true,
        attemptedImage: attemptedimageid,
        challengeId: challengeid,
        creatorId: userid,
    }});
    return newSubmission;
  }
}

export default SubmissionService;
