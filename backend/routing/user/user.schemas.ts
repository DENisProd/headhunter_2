export const getUserProfileSchema = {
    description: 'Профиль пользователя пользователя',
    tags: ['Авторизация'],
    security: [{Bearer: []}],
    summary: 'Профиль пользователя пользователя',
    response: {
        200: {
            description: 'Профиль успешно получен',
            type: 'object',
            properties: {
                profile: {
                    id: {type: 'number'},
                    userId: {type: 'number'},
                },
                user: {
                    id: {type: 'number'},
                    avatar: {type: 'string'}
                },
                userType:  { type: 'string' }
            },
        },
        401: {
            description: 'Токен протух',
            type: 'object',
            properties: {
                message: {type: 'string'},
            },
        }
    },
};