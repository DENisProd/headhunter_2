import {StudentForm} from "../models/dto/StudentForm";
import {db} from "../database/db";

export interface IGetParams {
    scienceScore: number
}

export async function getStudentForms(params: IGetParams) {
    return await db.studentProfile.findMany({})
}