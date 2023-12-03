import {db} from "../database/db";
import {Education} from "../controllers/student.controller";

export async function _createEducation(data: Education, studentId: number) {
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