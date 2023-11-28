import {FastifyInstance} from "fastify";
import {User} from "../../models/dto/User";
import {loginUserSchema, refreshTokenUserSchema, registerUserSchema} from "../auth/auth.schemas";
import * as profileController from "../../controllers/profile.controller";
import {isAuthenticated} from "../../middleware/authenticate.middleware";
// import { uploadSingle } from "../../middleware/upload.middleware";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.post("/portfolio", {
        // schema: getUserProfileSchema,
        // preHandler: uploadSingle('file'),
        handler: profileController.addPortfolio
    })
}