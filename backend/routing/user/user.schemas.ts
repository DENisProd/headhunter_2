export const getUserProfileSchema = {
    description: 'Профиль пользователя пользователя',
    tags: ['Авторизация'],
    security: [{ Bearer: [] }],
    summary: 'Профиль пользователя пользователя',
    response: {
        200: {
            description: 'Профиль успешно получен',
            type: 'object',
            properties: {
                id: { type: 'number' },
                userId: { type: 'number' },
            },
        },
        401: {
            description: 'Токен протух',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        }
    },
};