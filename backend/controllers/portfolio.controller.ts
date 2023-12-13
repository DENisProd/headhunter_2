import {FastifyReply, FastifyRequest} from "fastify";
import {
    _createPortfolioDocument,
    _getPortfolioDocumentById, deleteEduPortfolioToStudentId, getEduPortfolioToStudentId,
    getPortfolioDocumentsByStudentId, setEduPortfolioToStudentId, updatePortfolioNumbers
} from '../services/portfolioService';
import {findUserByEmail, getStudentProfileById} from "../services/userService";
import {createPortfolioFile} from "../services/portfolioFileService";
import {EduPortfolio} from "../models/dto/EduPortfolio";
import * as repl from "repl";

export type PortfolioFileCreate = {
    url: string
    mimeType: string
}

type PortfolioDocCreate = {
    type: string
    name: string
    description: string
    files: PortfolioFileCreate[]
}

type category = {
    category: string
    description: string
    categoryID: number
}

export type EduPortfolioDto = {
    categories: category[]
    listWorks: EduPortfolio[]
    email: string
    admissionYear: number
    avgMark: number
    birthday: string
    facul: string
    groupID: number
    kafName: string
    middleName: string
    name: string
    surname: string
}

export const createPortfolioDocument = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = (req as any).user;
        const { userId } = user;

        const studentProfile = await getStudentProfileById(userId);
        if (!studentProfile) return reply.status(404).send({ message: 'Профиль не найден'})

        const data = req.body as PortfolioDocCreate;
        const document = await _createPortfolioDocument(data, studentProfile.id);
        await Promise.all(data.files.map(async file => {
            await createPortfolioFile(file, document.id)
        }))

        reply.send(document);
    } catch (error) {
        console.log(error)
        reply.status(500).send({ error: 'Ошибка при создании документа' });
    }
}

export const getUserPortfolio = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = (request as any).user;
        const { userId } = user;

        const studentProfile = await getStudentProfileById(userId);

        if (!studentProfile) return reply.status(404).send({ message: 'Профиль не найден'})

        const documents = await getPortfolioDocumentsByStudentId(studentProfile.id);
        return reply.send(documents);
    } catch (error) {
        console.log(error)
        return reply.status(500).send({ error: 'Ошибка при создании документа' });
    }
}

export const addEduPortfolio = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const portfolio = request.body as EduPortfolioDto

        const user = await findUserByEmail(portfolio.email)
        if (!user) return reply.status(404).send({ message: 'Пользователь не найден' })

        const studentProfile = await getStudentProfileById(user.id);
        if (!studentProfile) return reply.status(404).send({ message: 'Профиль не найден'})

        const eduPortfolio = await getEduPortfolioToStudentId(studentProfile.id)
        if (eduPortfolio) await deleteEduPortfolioToStudentId(studentProfile.id)

        let _categories: { [key: string]: string } = {};
        portfolio.categories.map(category => _categories[category.category] = category.description);

        const newListWorks2: EduPortfolio[] = portfolio.listWorks.map(item => ({ ...item, category: _categories[item.category] || "Другое" }))

        const newListWorks = await Promise.all(portfolio.listWorks.map(async item => {
            const updatedItem: EduPortfolio = {
                name: item.name,
                ballOfWork: item.ballOfWork,
                category: _categories[item.category] || "Другое",
                description: item.description,
                typeName: item.typeName,
            }
            return await setEduPortfolioToStudentId(studentProfile.id, updatedItem);
        }));

        await updatePortfolioNumbers(studentProfile.id, newListWorks2, portfolio)

        return reply.send(newListWorks)
    } catch (error) {
        console.log(error)
        return reply.status(500).send({ error: 'Ошибка при добавлении портфолио' });
    }
}

export const getEduPortfolio = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = (request as any).user;
        const { userId } = user;

        const studentProfile = await getStudentProfileById(userId);
        if (!studentProfile) return reply.status(404).send({ message: 'Профиль не найден'})

        const eduPortfolio = await getEduPortfolioToStudentId(studentProfile.id)

        return reply.send(eduPortfolio)
    } catch (e) {
        console.log(e)
        return reply.status(500).send('Ошибка получения портфолио')
    }
}

// export const getPortfolioDocumentById = async (req: FastifyRequest, reply: FastifyReply) => {
//     try {
//         const id: number = parseInt(req.params.id as string, 10);
//         const document = await _getPortfolioDocumentById(id);
//         if (document) {
//             reply.send(document);
//         } else {
//             reply.status(404).send({ error: 'Документ не найден' });
//         }
//     } catch (error) {
//         reply.status(500).send({ error: 'Ошибка при чтении документа' });
//     }
// }

// export async function updatePortfolioDocument(req: FastifyRequest, reply: FastifyReply) {
//     try {
//         const id = parseInt(req.params.id, 10);
//         const data = req.body;
//         const document = await updatePortfolioDocument(id, data);
//         reply.send(document);
//     } catch (error) {
//         reply.status(500).send({ error: 'Ошибка при обновлении документа' });
//     }
// }
//
// export async function deletePortfolioDocument(req: FastifyRequest, reply: FastifyReply) {
//     try {
//         const id = parseInt(req.params.id, 10);
//         await deletePortfolioDocument(id);
//         reply.send({ message: 'Документ успешно удален' });
//     } catch (error) {
//         reply.status(500).send({ error: 'Ошибка при удалении документа' });
//     }
// }