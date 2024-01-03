import {StudentForm} from "../models/dto/StudentForm";
import {db} from "../database/db";

export interface IGetParams {
    scienceScore: number
}

export async function getStudentForms(params: IGetParams) {
    return await db.studentProfile.findMany({})
}

export async function createOffer(studentId: number, employerId: number, type: number) {
    return await db.offer.create({
        data: {
            employerId,
            studentId,
            type: type || 0
        }
    })
}