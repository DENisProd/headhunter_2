import type { FastifySchema } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'

export const registerUserSchema = {
    description: 'Регистрация пользователя',
    tags: ['Авторизация'],
    summary: 'Регистрация пользователя_',
    security: [],
    body: {
        type: 'object',
        properties: {
            email: { type: 'string' },
            password: { type: 'string' },
        },
    },
    response: {
        200: {
            description: 'Пользователь создан',
            type: 'object',
            properties: {
                accessToken: { type: 'string' },
                refreshToken: { type: 'string' },
            },
        },
        400: {
            description: 'Неправильный запрос, либо пользователь существует',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        }
    },
};

export const loginUserSchema = {
    description: 'Авторизация пользователя',
    tags: ['Авторизация'],
    summary: 'Авторизация пользователя',
    security: [],
    body: {
        type: 'object',
        properties: {
            email: { type: 'string' },
            password: { type: 'string' },
        },
    },
    response: {
        200: {
            description: 'Авторизация успешна',
            type: 'object',
            properties: {
                accessToken: { type: 'string' },
                refreshToken: { type: 'string' },
            },
        },
        400: {
            description: 'Некорректный запрос',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        403: {
            description: 'Неправильный логин или пароль',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        }
    },
};

export const refreshTokenUserSchema = {
    description: 'Обновление токена пользователя',
    tags: ['Авторизация'],
    summary: 'Обновление токена пользователя',
    security: [{ Bearer: [] }],
    body: {
        type: 'object',
        properties: {
            refreshToken: { type: 'string' },
        },
    },
    response: {
        200: {
            description: 'Авторизация успешна',
            type: 'object',
            properties: {
                accessToken: { type: 'string' },
                refreshToken: { type: 'string' },
            },
        },
        400: {
            description: 'Некорректный запрос',
            type: 'object',
            properties: {
                message: { type: 'string' },
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