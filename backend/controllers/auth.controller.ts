import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {v4 as uuidv4} from "uuid";
import bcrypt from 'bcrypt';
import jwt, { VerifyErrors  } from 'jsonwebtoken';
import {
    confirmUserEmailById,
    createEmployerProfileById, createStudentProfileById,
    createUserByEmailAndPassword,
    findUserByEmail,
    findUserById
} from "../services/userService";
import {generateTokens, hashToken, hashToken256} from "../services/tokenService";
import {
    addRefreshTokenToWhitelist,
    deleteRefreshToken,
    findRefreshTokenById, findUserByConfirmHash,
    revokeTokens, sendConfirmationEmail
} from "../services/authService";
import {User} from "../models/dto/User";
import {STATUS_CODES} from "http";

export interface IRegisterProps {
    email: string,
    password: string,
    role: number,
    firstName: string,
    inn: string
}

export async function register(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { email, password, role, firstName, inn } = req.body as IRegisterProps;
        if (!email || !password) {
            reply.status(400);
            throw new Error('You must provide an email and a password.');
        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            reply.status(400);
            throw new Error('Email already in use.');
        }

        const userData = email + "" + Date.now()
        const hash = hashToken256(userData)

        const newUser: User = {
            email: email,
            password : password,
            confirmHash: hash,
        };

        const user = await createUserByEmailAndPassword(newUser);

        if (Number(role) === 3) await createEmployerProfileById(user.id, firstName, inn)
        else await createStudentProfileById(user.id, firstName)

        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

        await sendConfirmationEmail(user, hash)

        reply.send({
            accessToken,
            refreshToken,
        });
    } catch (err) {
        reply.send(err);
    }
}

export async function login(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { email, password } = req.body as { email: string; password: string };
        if (!email || !password) {
            reply.status(400);
            throw new Error('You must provide an email and a password.');
        }

        const existingUser = await findUserByEmail(email);

        if (!existingUser) {
            reply.status(403);
            throw new Error('Invalid login credentials.');
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            reply.status(403);
            throw new Error('Invalid login credentials.');
        }

        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(existingUser, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

        reply.send({
            accessToken,
            refreshToken,
        });
    } catch (err) {
        reply.send(err);
    }
}

export async function refreshTokenController(req: FastifyRequest, res: FastifyReply) {
    try {
        const { refreshToken } = req.body as { refreshToken: string };
        if (!refreshToken) {
            res.status(400);
            throw new Error('Missing refresh token.');
        }

        const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
        if (!jwtRefreshSecret) {
            res.status(500);
            throw new Error('JWT_REFRESH_SECRET is not defined');
        }

        let payload: jwt.JwtPayload | null = null;

        try {
            const token = jwt.verify(refreshToken, jwtRefreshSecret) as jwt.JwtPayload;
            if (typeof token === 'object' && token !== null) {
                payload = token;
            }
        } catch (error) {
            const err: VerifyErrors = error as VerifyErrors;
            res.status(401);
            if (err.name === 'TokenExpiredError') {
                throw new Error(err.name);
            }
            throw Error('Unauthorized');
        }

        if (!payload || typeof payload.userId !== 'number' || typeof payload.jti !== 'string') {
            res.status(401);
            throw new Error('Invalid refresh token payload');
        }

        const savedRefreshToken = await findRefreshTokenById(payload.jti);
        if (!savedRefreshToken || savedRefreshToken.revoked === true) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const user = await findUserById(payload.userId);
        if (!user) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        await deleteRefreshToken(savedRefreshToken.id);
        const jti = uuidv4();
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });

        res.send({
            accessToken,
            refreshToken: newRefreshToken,
        });
    } catch (err) {
        res.send(err);
    }
}

export async function revokeRefreshTokensController(req: FastifyRequest, res: FastifyReply) {
    try {
        const { userId } = req.body as { userId: number };
        await revokeTokens(userId);
        res.send({ message: `Tokens revoked for user with id #${userId}` });
    } catch (err) {
        res.send(err);
    }
}

export async function confirmUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { hash } = request.params as { hash: string }
        const user = await findUserByConfirmHash(hash)

        if (!user) return reply.status(404).send({message: 'Пользователь не найден'})

        await confirmUserEmailById(user[0].id)

        return reply.send({ message: `User confirmed${hash}` });
    } catch (err) {
        return reply.send(err);
    }
}