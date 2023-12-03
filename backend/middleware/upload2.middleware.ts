import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fastifyMulter from 'fastify-multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import {StorageEngine} from "fastify-multer/lib/interfaces";

const upload = fastifyMulter({
    dest: 'uploads/',
    limits: {
        fileSize: 1024 * 1024 * 10  // Увеличил лимит для примера до 20MB
    },
    fileFilter: function (req, file, cb) {
        // if (file.mimetype.startsWith('image/') ||  // Поддержка изображений (png, jpeg, etc)
        //     file.mimetype === 'application/pdf' ||  // Поддержка PDF
        //     file.mimetype === 'application/msword' ||  // Поддержка документов Word
        //     file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {  // Поддержка презентаций PowerPoint
        //     cb(null, true);
        // } else {
        //     cb(null, false);
        // }
        cb(null, true);
    }
});

upload.storage = function (req, file, cb) {
    cb(null, 'uploads/');
}

upload.filename = function (req: any, file: any, cb: any) {
    let ext = path.extname(file.originalname);
    const uniqueFilename = `${uuidv4()}_${file.originalname}${ext}`;
    cb(null, uniqueFilename);
} as StorageEngine;


export default upload;
