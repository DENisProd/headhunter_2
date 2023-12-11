import {FastifyInstance} from "fastify";
import * as authController from '../../controllers/auth.controller';
import {User} from "../../models/dto/User";
import {revokeRefreshTokensController} from "../../controllers/auth.controller";
import {loginUserSchema, refreshTokenUserSchema, registerUserSchema} from "./auth.schemas";

export default async function authRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: Partial<User> }>("/register", {
        schema: registerUserSchema,
        handler: authController.register
    })
    fastify.post<{ Body: Partial<User> }>("/login", {
        schema: loginUserSchema,
        handler: authController.login
    })
    fastify.post("/refresh_token", {
        schema: refreshTokenUserSchema,
        handler: authController.refreshTokenController
    })
    fastify.post("/revoke_refresh_tokens", {
        handler: authController.revokeRefreshTokensController
    })
    fastify.get("/confirm/:hash", {
        handler: authController.confirmUser
    })
    // fastify.post("/reset", {
    //     handler: authController.re
    // })

}