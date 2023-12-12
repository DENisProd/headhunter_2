import {FastifyInstance} from "fastify";
import {getUserProfileSchema} from "../user/user.schemas";
import {isAuthenticated} from "../../middleware/authenticate.middleware";
import * as studentController from "../../controllers/student.controller";
import * as portfolioController from "../../controllers/portfolio.controller";
import {addStudentEducation, editStudentInformation} from "../../controllers/student.controller";

export default async function studentRoutes(fastify: FastifyInstance) {
    fastify.post("/education", {
        // schema: getUserProfileSchema,
        preHandler: isAuthenticated,
        handler: studentController.addStudentEducation
    })
    fastify.patch("/", {
        preHandler: isAuthenticated,
        handler: studentController.editStudentInformation
    })
    fastify.get("/all", {
        preHandler: isAuthenticated,
        handler: studentController.getStudentsForms
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