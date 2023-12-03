import {FastifyReply, FastifyRequest} from "fastify";
import {
    _createPortfolioDocument,
    _getPortfolioDocumentById,
    getPortfolioDocumentsByStudentId
} from '../services/portfolioService';
import {getStudentProfileById} from "../services/userService";
import {createPortfolioFile} from "../services/portfolioFileService";

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

export const createPortfolioDocument = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = (req as any).user;
        const { userId } = user;

        const studentProfile = await getStudentProfileById(userId);
        if (!studentProfile) return reply.status(404).send({ message: 'Профиль не найден'})

        const data = req.body as PortfolioDocCreate;
        console.log(data)
        const document = await _createPortfolioDocument(data, studentProfile.id);
        console.log(document)
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