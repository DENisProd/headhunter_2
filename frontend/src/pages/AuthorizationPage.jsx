import {RegisterForm} from "../components/Forms/RegisterForm";

export const AUTHORIZATION_TYPES = {
    WHO: 'WHO',
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER'
}

export const AuthorizationPage = ({ type }) => {
    return (
        <>
            <RegisterForm />
        </>
    )
}