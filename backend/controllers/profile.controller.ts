import {FastifyReply, FastifyRequest} from "fastify";

export const addPortfolio = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        reply.send({ message: 'ok' })
    }
    catch (e) {
        console.log(e)
    }
}