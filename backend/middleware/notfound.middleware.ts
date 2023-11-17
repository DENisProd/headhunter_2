import { FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(err: Error, req: FastifyRequest, res: FastifyReply) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.send({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
}
