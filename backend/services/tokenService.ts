import { FastifyReply } from "fastify";
import jwt, { Secret } from 'jsonwebtoken';
import crypto from "crypto";

export function setCookie(reply: FastifyReply, name: string, value: string, options: { httpOnly?: boolean, path?: string, sameSite?: 'Strict' | 'Lax' | 'None', expires?: Date }) {
    const cookie = `${name}=${value}; ${
        options.httpOnly ? 'HttpOnly; ' : ''
    }path=${options.path || '/'}; ${
        options.sameSite ? `SameSite=${options.sameSite}; ` : ''
    }${options.expires ? `Expires=${options.expires.toUTCString()}; ` : ''}`;

    reply.header('Set-Cookie', cookie);
}

export function sendRefreshToken(reply: FastifyReply, token: string) {

    setCookie(reply, 'refresh_token', token, {
        httpOnly: true,
        path: '/v1/auth',
        sameSite: 'Strict',
        expires: new Date(Date.now() + 36000),
    });

}

export function generateAccessToken(user: { id: number }) {
    return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET as Secret, {
        expiresIn: '25m',
    });
}

export function generateRefreshToken(user: { id: number }, jti: string) {
    return jwt.sign({
        userId: user.id,
        jti
    }, process.env.JWT_REFRESH_SECRET as Secret, {
        expiresIn: '4h',
    });
}

export function generateTokens(user: { id: number }, jti: string) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);

    return {
        accessToken,
        refreshToken,
    };
}

export function hashToken(token: string) {
    return crypto.createHash('sha512').update(token).digest('hex');
}
