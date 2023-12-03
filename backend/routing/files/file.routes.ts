import { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import multipart from '@fastify/multipart'
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'
import path from 'path';
// import mimeTypes from 'mime-types';
import {uploadsDir} from "../../server"; // Импортируем пакет mime-types
import mimeTypes from 'mime-types'

const pump = util.promisify(pipeline)

const uploadOptions: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' }
            }
        }
    }
};

export default async function fileRoutes(fastify: FastifyInstance) {
    fastify.register(multipart)

    fastify.post('/upload', async (request: FastifyRequest, reply: FastifyReply) => {
        const data = await request.file()

        if (data && data.file) {
            await pump(data.file, fs.createWriteStream(path.join(uploadsDir, data.filename)));

            try {
                const stats = await fs.promises.stat(path.join(uploadsDir, data.filename));
                const fileSize = stats.size;

                // Определить MIME-тип файла на основе расширения
                const mimeType = mimeTypes.lookup(data.filename) || 'application/octet-stream';

                reply.send({
                    message: 'ok',
                    file: {
                        filename: data.filename,
                        size: fileSize,
                        mimeType: mimeType,
                    }
                });
            } catch (error) {
                console.error('Ошибка при получении размера файла', error);
                reply.send({ message: 'Ошибка при обработке файла' });
            }
        } else {
            reply.send({ message: 'ok' });
        }
    });
}
