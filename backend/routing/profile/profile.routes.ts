import {FastifyInstance} from "fastify";
import {User} from "../../models/dto/User";
import {loginUserSchema, refreshTokenUserSchema, registerUserSchema} from "../auth/auth.schemas";
import * as profileController from "../../controllers/profile.controller";
import * as portfolioController from "../../controllers/portfolio.controller";
import {isAuthenticated} from "../../middleware/authenticate.middleware";
import {addEduPortfolio, getEduPortfolio} from "../../controllers/portfolio.controller";
// import { uploadSingle } from "../../middleware/upload.middleware";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.post("/portfolio", {
        // schema: getUserProfileSchema,
        // preHandler: uploadSingle('file'),
        handler: profileController.addPortfolio
    })
    fastify.post("/edu_portfolio", {
        handler: portfolioController.addEduPortfolio
    })
    fastify.get("/edu_portfolio", {
        preHandler: isAuthenticated,
        handler: portfolioController.getEduPortfolio
    })
}