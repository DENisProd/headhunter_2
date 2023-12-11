import {IBaseDTO} from "../baseDTO";

export const createEmailConfirmDTO = ( to:string, hash:string ):IBaseDTO => {
    const message = {
        to,
        subject: 'Подтвердите адрес электронной почты',
        text: `Пожалуйста, подтвердите свой адрес электронной почты, перейдя по ссылке: 
            <a href="${process.env.BASE_URL + "/auth/confirm/" + hash}">Подтвердить</a>`
    }

    return message as IBaseDTO
}

export const createPasswordResetDTO = ( to:string, hash:string ):IBaseDTO => {
    const message = {
        to,
        subject: 'Сброс пароля',
        text: `Для сброса пароля, перейдите по ссылке: 
            <a href="${process.env.BASE_URL + "/auth/reset/" + hash}">Сбросить пароль</a>`
    }

    return message as IBaseDTO
}