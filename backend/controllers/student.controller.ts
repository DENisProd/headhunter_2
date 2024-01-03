import {FastifyReply, FastifyRequest} from "fastify";
import {_createEducation} from "../services/educationService";
import {getEmployerProfileById, getStudentProfileById, updateStudentProfileById} from "../services/userService";
import * as StudentService from "../services/studentService"

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
        if (!updatedStudent) return reply.status(400).send({message: 'ошибка'})
        return reply.status(200).send(updatedStudent)

    } catch (e) {
        console.log(e)
        return reply.status(500)
    }
}

export const getStudentsForms = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const students = await StudentService.getStudentForms({ scienceScore: 0})

        return reply.send(students)
    } catch (e) {
        console.log(e)
        return reply.status(500)
    }
}

export const getStudentProfile = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = (request as any).user
        const {userId} = user

        const { id } = request.params as { id: number }

        const studentProfile = await getStudentProfileById(id)
        if (!studentProfile) return reply.status(404).send({message: 'Профиль не найден'})

        return reply.send(studentProfile)
    } catch (e) {
        console.log(e)
        return reply.status(500)
    }
}

export const createOffer = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = (request as any).user
        const {userId} = user
        const { studentId, type } = request.body as { studentId: number, type: number }

        const employerProfile = await getEmployerProfileById(userId)
        if (!employerProfile) return reply.status(404).send({message: 'Работодатель не найден'})

        const studentProfile = await getStudentProfileById(studentId)
        if (!studentProfile) return reply.status(404).send({message: 'Студент не найден'})

        const newOffer = await StudentService.createOffer(studentId, employerProfile.id, type)
        return reply.send(newOffer)
    } catch (e) {
        console.log(e)
        return reply.status(500).send('Ошибка при создании приглашения')
    }
}