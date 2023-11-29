import {db} from "../database/db";

export async function _createPortfolioDocument(data: any, studentId: number) {
    return await db.portfolioDocument.create({
        data: {
            studentId,
            name: data.name,
            description: data.description,
            type: data.type
        },
    });
}

export async function _getPortfolioDocumentById(id: number) {
    return await db.portfolioDocument.findUnique({
        where: { id: id },
    });
}

export async function getPortfolioDocumentsByStudentId(studentId: number) {
    return await db.portfolioDocument.findMany({
        where: {
            studentId: studentId,
        },
        include: {
            portfolioFile: true
        }
    });
}

// export async function _updatePortfolioDocument(id: number, data: any) {
//     return await db.portfolioDocument.update({
//         where: { id: id },
//         data: data,
//     });
// }
//
// export async function _deletePortfolioDocument(id: number) {
//     return await db.portfolioDocument.delete({
//         where: { id: id },
//     });
// }
