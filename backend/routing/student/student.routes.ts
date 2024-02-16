import {FastifyInstance} from "fastify";
import {getUserProfileSchema} from "../user/user.schemas";
import {isAuthenticated} from "../../middleware/authenticate.middleware";
import * as studentController from "../../controllers/student.controller";
import * as portfolioController from "../../controllers/portfolio.controller";
import {
    addStudentEducation,
    addWorkExperience,
    editStudentInformation, getStudentWorks,
    setIsStudentWork
} from "../../controllers/student.controller";

export default async function studentRoutes(fastify: FastifyInstance) {
    fastify.post("/education", {
        // schema: getUserProfileSchema,
        preHandler: isAuthenticated,
        handler: studentController.addStudentEducation
    })
    fastify.get("/works", {
        // schema: getUserProfileSchema,
        preHandler: isAuthenticated,
        handler: studentController.getStudentWorks
    })
    fastify.post("/workexp", {
        preHandler: isAuthenticated,
        handler: studentController.addWorkExperience
    })
    fastify.patch("/", {
        preHandler: isAuthenticated,
        handler: studentController.editStudentInformation
    })
    fastify.get("/all", {
        preHandler: isAuthenticated,
        handler: studentController.getStudentsForms
    })
    fastify.post("/offer", {
        preHandler: isAuthenticated,
        handler: studentController.createOffer
    })
    fastify.get("/offers", {
        preHandler: isAuthenticated,
        handler: studentController.getOffers
    })
    fastify.get("/work", {
        preHandler: isAuthenticated,
        handler: studentController.setIsStudentWork
    })
    fastify.get("/:id", {
        preHandler: isAuthenticated,
        handler: studentController.getStudentProfile
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