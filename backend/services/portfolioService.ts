import {db} from "../database/db";
import {EduPortfolio} from "../models/dto/EduPortfolio";
import {EduPortfolioDto} from "../controllers/portfolio.controller";

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

export async function setEduPortfolioToStudentId(studentId: number, portfolioDto: EduPortfolio) {
    return await db.portfolioEdu.create({
        data: {
            ...portfolioDto,
            studentId
        }
    })
}

export async function updatePortfolioNumbers(studentId: number, portfolioDto: EduPortfolio[], portfolio: EduPortfolioDto) {
    let rating: { [key: string]: number } = {
        'Научно-исследовательская': 0,
        'Другое': 0,
        'Учебная и проектная': 0,
        'Общественная': 0,
        'Мои проекты': 0,
        'Достижения до поступления': 0,
        'Спортивная': 0,
        'Культурно-творческая': 0
    }
    let total: number = 0

    portfolioDto.forEach(portfolio => {
        total += portfolio.ballOfWork
        rating[portfolio.category] += portfolio.ballOfWork
    })

    return await db.studentProfile.update({
        data: {
            science: rating['Научно-исследовательская'],
            study: rating['Учебная и проектная'],
            community: rating['Общественная'],
            culture: rating['Культурно-творческая'],
            project: rating['Учебная и проектная'],
            sport: rating['Спортивная'],
            total,
            lastName: portfolio.surname,
            firstName: portfolio.name,
            patronymic: portfolio.middleName,
            avgMark: portfolio.avgMark
        },
        where: {
            id: studentId
        }
    })
}

export async function getEduPortfolioToStudentId(studentId: number) {
    return await db.portfolioEdu.findMany({
        where: {
            studentId
        }
    })
}

export async function deleteEduPortfolioToStudentId(studentId: number) {
    return await db.portfolioEdu.deleteMany({
        where: {
            studentId,
        },
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
