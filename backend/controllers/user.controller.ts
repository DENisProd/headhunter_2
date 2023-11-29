import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {findUserById, getEmployerProfileById, getStudentProfileById} from "../services/userService";

export const getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = (request as any).user;
        const { userId } = user;

        const userProfile = await findUserById(userId)
        // console.log(userProfile)

        const studentProfile = await getStudentProfileById(userId);
        const employerProfile = await getEmployerProfileById(userId);

        if (studentProfile) {
            return reply.send({ profile: studentProfile, user: userProfile, userType: "student"});
        } else if (employerProfile) {
            return reply.send({ profile: employerProfile, user: userProfile, userType: "employer"});
        }
            return reply.code(404).send({ error: 'User profile not found' });
    } catch (error) {
        console.log('Error:', error);
        return reply.code(500).send({ error: 'Failed to fetch user profile' });
    }
};