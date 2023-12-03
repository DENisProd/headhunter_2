import { FastifyRequest, FastifyReply } from 'fastify';
import upload from '../middleware/upload2.middleware';

export async function handleFileUpload(req: FastifyRequest, reply: FastifyReply) {
    try {
        const multerMiddleware = upload.any();
        await new Promise((resolve, reject) => {
            multerMiddleware(req, reply, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        // Получите информацию о загруженных файлах из req.body
        const filesInfo = req.body;

        // В filesInfo будет объект, содержащий информацию о всех загруженных файлах
        // В этом объекте вы можете найти названия файлов и другие метаданные

        return {
            message: 'File upload successful',
            filesInfo: filesInfo, // Включите информацию о файлах в ответ
        };
    } catch (error) {
        console.error('File upload error:', error);
        return 'File upload failed';
    }
}
