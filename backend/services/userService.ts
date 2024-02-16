import bcrypt from 'bcrypt'
import {User} from "../models/dto/User";
import {db} from "../database/db";
import {StudentEditProfile} from "../controllers/student.controller";

export function findUserByEmail(email: string) {
    return db.user.findUnique({
        where: {
            email,
        },
    })
}

export function createUserByEmailAndPassword(user: User) {
    user.password = bcrypt.hashSync(user.password, 12);
    return db.user.create({
        data: {
            ...user,
            confirmHashCreated: new Date()
        },
    })
}

export function findUserById(id: number) {
    return db.user.findUnique({
        where: {
            id,
        },
    })
}

export function createStudentProfileById (userId: number, firstName: string) {
    return db.studentProfile.create({
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

export function updateStudentProfileById(userId: number, updatedData: StudentEditProfile) {
    return db.studentProfile.update({
        where: { userId },
        data: {
            ...updatedData
        }
    });
}

export function getEmployerProfileById (userId: number) {
    return db.employerProfile.findUnique({
        where: { userId },
    })
}

export function createEmployerProfileById (userId: number, firstName: string, inn: string) {
    return db.employerProfile.create({
        data: {
            inn,
            userId
        },
    })
}

export function confirmUserEmailById (id: number) {
    return db.user.update({
        where: {
            id
        },
        data: {
            emailConfirmed: true
        }
    })
}