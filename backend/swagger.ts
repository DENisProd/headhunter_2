export const swaggerData: object = {
    swagger: {
        info: {
            title: "HeadHunter",
            description: "OpenAPI",
            version: "16.10.2023",
        },
        externalDocs: {
            url: "https://swagger.io",
            description: "Find more info here",
        },
        tags: [
            {
                name: "Admin Login",
                description:
                    "Конечные точки, связанные с авторизацией и проверки авторизации пользователя",
            },
        ],
        schemes: ["http", "https"],
        consumes: ["application/json"],
        produces: ["application/json"],
        security: [
            {
                Bearer: [],
            },
        ],
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
        },
    },
    exposeRoute: true,
}

export const swaggerUIData: object = {
    routePrefix: "/v1/docs",
    uiConfig: {
        docExpansion: "list",
        deepLinking: true,
    },
    staticCSP: true,
    transformSpecificationClone: true,
}