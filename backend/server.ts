import Fastify from "fastify"
import cors from "@fastify/cors"
import swagger from "@fastify/swagger"
import swaggerUI from "@fastify/swagger-ui"
import {swaggerData, swaggerUIData} from "./swagger"
import authRoutes from "./routing/auth/auth.routes";
import Admin from "./routing/admin";
import userRoutes from "./routing/user/user.routes";

const fastify = Fastify({ logger: true, bodyLimit: 30 * 1024 * 1024 })
fastify.register(cors, {})
fastify.register(swagger, swaggerData)
fastify.register(swaggerUI, swaggerUIData)

fastify.register(authRoutes, { logLevel: "debug", prefix: "/v1/auth" })
fastify.register(userRoutes, { logLevel: "debug", prefix: "/v1/user" })
fastify.register(Admin, { logLevel: "debug", prefix: "/v1/admin" })

fastify.listen({ port: 8080 }, (err, addr) => {
    if (err) throw err;
    console.log(`Start server...\n${addr}`);
});
