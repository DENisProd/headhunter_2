import bcrypt from 'bcrypt'
import {User} from "../models/dto/User";
import {db} from "../database/db";
import {StudentEditProfile} from "../controllers/student.controller";

export async function findUserByEmail(email: string) {
    return await db.user.findUnique({
        where: {
            email,
        },
    })
}

export async function createUserByEmailAndPassword(user: User) {
    user.password = bcrypt.hashSync(user.password, 12);
    return await db.user.create({
        data: {
            ...user,
            confirmHashCreated: new Date()
        },
    })
}

export async function findUserById(id: number) {
    return await db.user.findUnique({
        where: {
            id,
        },
    })
}

export async function createStudentProfileById (userId: number, firstName: string) {
    return await db.studentProfile.create({
        data: {
            userId,
            firstName
        },
    })
}

export async function getStudentProfileById (userId: number) {
    console.log(userId);
    return await db.studentProfile.findUnique({
        where: { userId },
        include: {
            educations: true,
            works: true
        }
    })
}

export async function updateStudentProfileById(userId: number, updatedData: StudentEditProfile) {
    return await db.studentProfile.update({
        where: { userId },
        data: {
            ...updatedData
        }
    });
}

export async function getEmployerProfileById (userId: number) {
    return await db.employerProfile.findUnique({
        where: { userId },
    })
}

export async function createEmployerProfileById (userId: number, firstName: string, inn: string) {
    return await db.employerProfile.create({
        data: {
            inn,
            userId
        },
    })
}

export async function confirmUserEmailById (id: number) {
    return await db.user.update({
        where: {
            id
        },
        data: {
            emailConfirmed: true
        }
    })
}