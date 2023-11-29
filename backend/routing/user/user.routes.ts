import {FastifyInstance} from "fastify";
import {User} from "../../models/dto/User";
import {loginUserSchema, refreshTokenUserSchema, registerUserSchema} from "../auth/auth.schemas";
import * as userController from "../../controllers/user.controller";
import * as portfolioController from "../../controllers/portfolio.controller"
import {getUserProfileSchema} from "./user.schemas";
import {isAuthenticated} from "../../middleware/authenticate.middleware";
import {createPortfolioDocument, getUserPortfolio} from "../../controllers/portfolio.controller";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get("/profile", {
        schema: getUserProfileSchema,
        preHandler: isAuthenticated,
        handler: userController.getProfile
    })
    fastify.get("/portfolio", {
        preHandler: isAuthenticated,
        handler: portfolioController.getUserPortfolio
    })
    fastify.post("/portfolio", {
        preHandler: isAuthenticated,
        handler: portfolioController.createPortfolioDocument
    })
}