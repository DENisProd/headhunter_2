import {FastifyReply, FastifyRequest} from "fastify";
import {_createEducation} from "../services/educationService";
import {getStudentProfileById} from "../services/userService";

export type Education = {
    faculty: string
    name: string
    specialization: string
    period: string
}

export const addStudentEducation = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const eduData : Education = request.body as Education

        const user = (request as any).user;
        const { userId } = user;

        const studentProfile = await getStudentProfileById(userId);

        if (!studentProfile) return reply.status(404).send({ message: 'Профиль не найден'})
        const edu = await _createEducation(eduData, studentProfile.id)

        reply.send(edu)
    }
    catch (e) {
        console.log(e)
        reply.status(500)
    }
}