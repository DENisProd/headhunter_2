import {FastifyInstance} from "fastify";
import {User} from "../../models/dto/User";
import {loginUserSchema, refreshTokenUserSchema, registerUserSchema} from "../auth/auth.schemas";
import * as userController from "../../controllers/user.controller";
import {getUserProfileSchema} from "./user.schemas";
import {isAuthenticated} from "../../middleware/authenticate.middleware";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get("/profile", {
        schema: getUserProfileSchema,
        preHandler: isAuthenticated,
        handler: userController.getProfile
    })
}