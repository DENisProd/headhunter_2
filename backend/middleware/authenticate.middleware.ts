import { FastifyInstance, FastifyRequest, FastifyReply, HookHandlerDoneFunction, preHandlerHookHandler } from 'fastify';
import jwt, { Secret } from 'jsonwebtoken';

export const isAuthenticated: preHandlerHookHandler = async function (
    req,
    res
): Promise<void> {
    const { authorization } = req.headers as { authorization: string };

    if (!authorization) {
        res.status(401);
        throw new Error('🚫 Un-Authorized 🚫');
    }

    try {
        const token = authorization.split(' ')[1];
        const secret: Secret = process.env.JWT_ACCESS_SECRET || 'qwerty123';
        const user = await jwt.verify(token, secret);
        (req as any).user = user;
    } catch (err) {
        res.status(401);
        if (err instanceof jwt.TokenExpiredError) {
            throw new Error(err.name);
        }
        throw new Error('🚫 Un-Authorized 🚫');
    }
}
