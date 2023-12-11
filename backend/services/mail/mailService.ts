import {IBaseDTO} from "./baseDTO";
import { createTransport } from 'nodemailer';

export const sendMailTo = async (dto: IBaseDTO) => {
    const transporter = createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'denis.secret2022@yandex.ru',
            pass: 'ssypqjkfmctcmjbk',
        },
    });

    const mailOptions = {
        from: 'denis.secret2022@yandex.ru',
        to: dto.to,
        subject: dto.subject,
        html: dto.text,
    };

    try {
        await transporter.sendMail(mailOptions);
        return 'Email sent successfully'
    } catch (error) {
        console.error(error);
        throw new Error("Failed to send email")
    }
}