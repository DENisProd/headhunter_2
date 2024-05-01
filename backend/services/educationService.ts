import {db} from "../database/db";
import {Education} from "../controllers/student.controller";

async function createEducation(data: Education, studentId: number) {
    return await db.studentEducation.create({
        data: {
            studentId,
            name: data.name,
            specialization: data.specialization,
            faculty: data.faculty,
            period:  data.period,
        },
    });
}

async function getEducation(studentId: number, name: string, faculty: string): Promise<Education[]> {
    return await db.studentEducation.findMany({
        where: {
            studentId,
            name,
            faculty
        }
    })
}

export default {
    createEducation,
    getEducation
}