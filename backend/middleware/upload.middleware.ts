import { FastifyReply, FastifyRequest } from 'fastify';
import sharp from 'sharp';
import fs from 'fs';
import { RawFile } from 'fastify-multer/lib/interfaces';

export const uploadFile = async (request: FastifyRequest, reply: FastifyReply) => {
    const file = request.file as RawFile; // Приводим к типу RawFile

    if (!file) {
        return reply.status(400).send({ message: 'Файл не предоставлен' });
    }

    try {
        // Путь к исходному файлу
        const originalPath = file.path;

        // Сжатие и сохранение файла
        const compressedPath = 'uploads/compressed-' + file.filename;
        await sharp(originalPath)
            .resize(1920, 1080, { fit: 'inside' })
            .toFormat('webp')
            .toFile(compressedPath);

        fs.unlinkSync(originalPath);

        // Обновление пути файла в request
        (request as any).file.path = compressedPath;

        return reply.send({
            message: 'Файл успешно загружен, сжат и конвертирован в WebP',
            file: compressedPath
        });
    } catch (error) {
        return reply.status(500).send({ message: 'Ошибка при обработке файла', error });
    }
};
