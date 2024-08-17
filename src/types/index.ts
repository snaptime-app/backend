interface User {
    id: string;
    username: string;
    session: string;
}

interface Challenge {
    id: string;

    createdAt: Date;
    updatedAt: Date;

    author?: User;
    authorId: string;
}

export {
    User,
    Challenge,
};
