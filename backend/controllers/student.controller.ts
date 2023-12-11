import {FastifyReply, FastifyRequest} from "fastify";
import {_createEducation} from "../services/educationService";
import {getStudentProfileById, updateStudentProfileById} from "../services/userService";

export type Education = {
    faculty: string
    name: string
    specialization: string
    period: string
}

export type StudentEditProfile = {
    firstName: string
    lastName: string
    patronymic: string
    skills: string
    interests: string
}

export const addStudentEducation = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const eduData: Education = request.body as Education

        const user = (request as any).user;
        const {userId} = user;

        const studentProfile = await getStudentProfileById(userId);

        if (!studentProfile) return reply.status(404).send({message: 'Профиль не найден'})
        const edu = await _createEducation(eduData, studentProfile.id)

        reply.send(edu)
    } catch (e) {
        console.log(e)
        reply.status(500)
    }
}

export const editStudentInformation = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const newUserData: StudentEditProfile = request.body as StudentEditProfile
        const user = (request as any).user;
        const {userId} = user;

        const studentProfile = await getStudentProfileById(userId);
        if (!studentProfile) return reply.status(404).send({message: 'Профиль не найден'})

        const data = {
            firstName: newUserData.firstName || studentProfile.firstName,
            lastName: newUserData.lastName || studentProfile.lastName,
            patronymic: newUserData.patronymic || studentProfile.patronymic,
            skills: newUserData.skills || studentProfile.skills,
            interests: newUserData.interests || studentProfile.interests,
        }

        const updatedStudent = await updateStudentProfileById(userId, data)
        if (!updatedStudent) reply.status(400).send({message: 'ошибка'})
        reply.status(200).send(updatedStudent)

    } catch (e) {
        console.log(e)
        reply.status(500)
    }
}