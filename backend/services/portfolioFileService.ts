import {db} from "../database/db";
import {PortfolioFileCreate} from "../controllers/portfolio.controller";

export async function createPortfolioFile(data: PortfolioFileCreate, portfolioDocumentId: number) {
    return await db.portfolioFile.create({
        data: {
            url: data.url,
            mimeType: data.mimeType,
            portfolioDocumentId
        },
    });
}


export async function getPortfolioFileById(id: number) {
    return await db.portfolioFile.findUnique({
        where: { id: id },
    });
}

export async function getPortfolioFilesByDocumentId(documentId: number) {
    return await db.portfolioFile.findMany({
        where: { portfolioDocumentId: documentId },
    });
}


// export async function updatePortfolioFile(id: number, data) {
//     return await db.portfolioFile.update({
//         where: { id: id },
//         data: data,
//     });
// }
//
//
// export async function deletePortfolioFile(id: number) {
//     return await db.portfolioFile.delete({
//         where: { id: id },
//     });
// }
