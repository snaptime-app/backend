import { prisma } from "../util/prismaClient";
import ImageService from "./imageService";

class SubmissionService {
  imageService: ImageService;

  constructor() {
    this.imageService = new ImageService();
  }

  async createSubmission(userId: number, challengeId: number, attemptedImageId: string, baseUrl: string): Promise<any> {
    const challengeImageId = await prisma.challenge.findUnique({
      where: {
        id: challengeId,
      },
      select: {
        correctImage: true,
      },
    });

    if (!challengeImageId) {
      throw new Error(`Challenge with id ${challengeId} was not found.`);
    }

    const attemptImageUrl = `${baseUrl}/${attemptedImageId}`;
    const challengeImageUrl = `${baseUrl}/${challengeImageId.correctImage}`;

    console.log("Attempt Image URL:", attemptImageUrl);
    console.log("Challenge Image URL:", challengeImageUrl);

    const acceptSubmission: boolean = await this.imageService.determineImagesSimilar(
      attemptImageUrl,
      challengeImageUrl,
    );

    const newSubmission = await prisma.submission.create({
      data: {
        isCorrect: acceptSubmission,
        attemptedImage: attemptedImageId,
        challengeId: challengeId,
        creatorId: userId,
      }
    });

    if (acceptSubmission) {
      // Find the group associated with the challenge
      const challenge = await prisma.challenge.findUnique({
        where: { id: challengeId },
        select: {
          groupId: true,
        },
      });
  
      if (challenge) {
        // Increment the user's points in the group
        await prisma.groupMembership.update({
          where: {
            userId_groupId: {
              userId: userId,
              groupId: challenge.groupId,
            },
          },
          data: {
            points: {
              increment: 10, // Increment by 1 point, or adjust based on your logic
            },
          },
        });
      }
    }

    return newSubmission;
  }
}

export default SubmissionService;
