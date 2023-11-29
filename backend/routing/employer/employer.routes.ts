import {FastifyInstance} from "fastify";
import {getUserProfileSchema} from "../user/user.schemas";
import {isAuthenticated} from "../../middleware/authenticate.middleware";
import * as userController from "../../controllers/user.controller";
import * as portfolioController from "../../controllers/portfolio.controller";

export default async function employerRoutes(fastify: FastifyInstance) {
    fastify.post("/balance", {
        // schema: getUserProfileSchema,
        preHandler: isAuthenticated,
        handler: userController.getProfile
    })
    // fastify.get("/portfolio", {
    //     preHandler: isAuthenticated,
    //     handler: portfolioController.getUserPortfolio
    // })
    // fastify.post("/portfolio", {
    //     preHandler: isAuthenticated,
    //     handler: portfolioController.createPortfolioDocument
    // })
}