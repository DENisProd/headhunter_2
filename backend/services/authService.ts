import {db} from "../database/db";
import {hashToken, hashToken256} from "./tokenService";
import {createEmailConfirmDTO} from "./mail/dto/emailConfirmDTO";
import {sendMailTo} from "./mail/mailService";

export function addRefreshTokenToWhitelist({ jti, refreshToken, userId }: { jti: string, refreshToken: string, userId: number }) {
    return db.refreshToken.create({
        data: {
            id: jti,
            hashedToken: hashToken(refreshToken),
            userId
        },
    });
}

export function findRefreshTokenById(id: string) {
    return db.refreshToken.findUnique({
        where: {
            id,
        },
    });
}

export function deleteRefreshToken(id: string) {
    return db.refreshToken.update({
        where: {
            id,
        },
        data: {
            revoked: true
        }
    });
}

export function revokeTokens(userId: number) {
    return db.refreshToken.updateMany({
        where: {
            userId
        },
        data: {
            revoked: true
        }
    });
}

export function findUserByConfirmHash(confirmHash: string) {
    return db.user.findMany({
        where: {
            confirmHash
        }
    })
}

export function findUserByResetHash(resetHash: string) {
    return db.user.findMany({
        where: {
            resetHash
        }
    })
}

export async function sendConfirmationEmail (user: any, hash: string) {
    console.log("sending mail with hash: " + hash)
    const confirmMailDto = createEmailConfirmDTO(user.email, hash)
    // const confirmMailDto = createEmailConfirmDTO("denisproduction17@gmail.com", hash)
    return await sendMailTo(confirmMailDto)
}
