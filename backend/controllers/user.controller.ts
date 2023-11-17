import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {getEmployerProfileById, getStudentProfileById} from "../services/userService";

export const getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = (request as any).user
        console.log(user)
        const { userId } = user

        const studentProfile = await getStudentProfileById(userId);
        const employerProfile = await getEmployerProfileById(userId);

        if (studentProfile) {
            reply.send(studentProfile);
        } else if (employerProfile) {
            reply.send(employerProfile);
        } else {
            reply.code(404).send({ error: 'User profile not found' });
        }
    } catch (error) {
        console.log(error)
        reply.code(500).send({ error: 'Failed to fetch user profile' });
    }
};
