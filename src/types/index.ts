interface User {
    id: number;
    username: string;
    session: string;
    GroupMembership: GroupMembership[]
    challenges: Challenge[]
    submissions: Submission[]
}

interface Group {
    id: number
    name: string
    GroupMembership: GroupMembership[]
    challenges: Challenge[]
}

interface GroupMembership {
    points: number

    userId: number
    user: User

    groupId: number
    group: Group
}
interface Challenge {
    id: number
    createdAt: Date
    updatedAt: Date
    groupId: number
    group: Group
    authorId: number
    author: User
    submissions: Submission[]
}

interface Submission {
    id: number
    isCorrect: Boolean
    createdAt: Date
    challengeId: number
    challenge: Challenge
    creatorId: number
    creator: User
}

interface ImageSimilarResult {
    isSimilar: boolean;
}

export {
    User,
    Group,
    GroupMembership,
    Challenge,
    Submission,
    ImageSimilarResult,
};

export type CreateUser = Omit<User, "id" | "GroupMembership" | "challenges" | "submissions">;