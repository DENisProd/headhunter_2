import Fastify from "fastify"
import multipart from '@fastify/multipart'
import cors from "@fastify/cors"
import swagger from "@fastify/swagger"
import swaggerUI from "@fastify/swagger-ui"
import {swaggerData, swaggerUIData} from "./swagger"
import authRoutes from "./routing/auth/auth.routes";
import Admin from "./routing/admin";
import userRoutes from "./routing/user/user.routes";
import profileRoutes from "./routing/profile/profile.routes";
import fileRoutes from "./routing/files/file.routes";
import fastifyStatic from '@fastify/static'
import path from "path";

const fastify = Fastify({ logger: true, bodyLimit: 30 * 1024 * 1024 })
fastify.register(cors, {})
fastify.register(swagger, swaggerData)
fastify.register(swaggerUI, swaggerUIData)

export const uploadsDir = path.join(__dirname, '/uploads');
// Настройка статического обслуживания папки 'uploads'
fastify.register(fastifyStatic, {
        root: uploadsDir, // Путь к папке с загруженными файлами
    prefix: '/v1/uploads', // Префикс URL, по которому будут доступны файлы
});

fastify.register(authRoutes, { logLevel: "debug", prefix: "/v1/auth" })
fastify.register(userRoutes, { logLevel: "debug", prefix: "/v1/user" })
fastify.register(profileRoutes, { logLevel: "debug", prefix: "/v1/user/prof" })
fastify.register(fileRoutes, { logLevel: "debug", prefix: "/v1/file" })
fastify.register(Admin, { logLevel: "debug", prefix: "/v1/admin" })

// fastify.use('/v1/files/', serveStatic(path.join(__dirname, '/uploads')))

fastify.listen({ port: 8080 }, (err, addr) => {
    if (err) throw err;
    console.log(`Start server...\n${addr}`);
});
