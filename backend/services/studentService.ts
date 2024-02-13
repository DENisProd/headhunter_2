import {db} from "../database/db";

export interface IGetParams {
    scienceScore: number
}

export async function getStudentForms(params: IGetParams) {
    return await db.studentProfile.findMany({
        where: {
            isWorkSearch: true
        }
    })
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

export async function getStudentOffers(studentId: number) {
    return await db.offer.findMany({
        where: {
            studentId
        },
        include: {
            student: true,
            employer: true
        }
    })
}

export async function getEmployerOffers(employerId: number) {
    return await db.offer.findMany({
        where: {
            employerId
        },
        include: {
            student: true,
            employer: true
        }
    })
}

export async function toggleIsWork(studentId: number) {
    try {
        // Найти текущее состояние IsWorkSearch
        const studentProfile = await db.studentProfile.findUnique({
            where: {
                id: studentId,
            },
        });

        if (!studentProfile) {
            throw new Error(`Студент с id ${studentId} не найден.`);
        }

        const currentIsWorkSearch = studentProfile.isWorkSearch;

        // Переключить состояние IsWorkSearch
        const updatedStudentProfile = await db.studentProfile.update({
            where: {
                id: studentId,
            },
            data: {
                isWorkSearch: !currentIsWorkSearch,
            },
        });

        // Вернуть обновленную запись
        return updatedStudentProfile;
    } catch (error) {
        // Обработка ошибок, если таковые возникнут
        console.error('Ошибка при переключении IsWorkSearch:', error);
        throw error;
    }
}

export default {
    toggleIsWork,
}