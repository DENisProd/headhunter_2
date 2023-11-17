import bcrypt from 'bcrypt'
import {User} from "../models/dto/User";
import {db} from "../database/db";

export function findUserByEmail(email: string) {
    return db.user.findUnique({
        where: {
            email,
        },
    });
}

export function createUserByEmailAndPassword(user: User) {
    user.password = bcrypt.hashSync(user.password, 12);
    return db.user.create({
        data: user,
    });
}

export function findUserById(id: number) {
    return db.user.findUnique({
        where: {
            id,
        },
    });
}

export function getStudentProfileById (userId: number) {
    return db.studentProfile.findUnique({
        where: { userId },
    });
}

export function getEmployerProfileById (userId: number) {
    return db.employerProfile.findUnique({
        where: { userId },
    });
}