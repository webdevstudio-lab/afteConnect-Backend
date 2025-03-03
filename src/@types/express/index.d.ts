declare namespace Express {
    interface Request {
        userId: string | undefined;
        sessionId: string | undefined;
        userRole: string | undefined;
        userPoste: string | undefined;
    }
}