import {RegisterForm} from "../components/Forms/RegisterForm";
import InfoBlock from "../components/Forms/InfoBlock/InfoBlock";
import { FlexLayout, LAYOUT_TYPES } from "../components/ui/Layout/FlexLayout/FlexLayout";
import styles from './authorization-page.module.scss'
import globalStyles from '../styles/global.module.scss'
import cn from 'classnames'
import {LoginForm} from "../components/Forms/LoginForm";
import RoleChoose from "../components/Forms/RoleChoose";

export const AUTHORIZATION_TYPES = {
    WHO: 'WHO',
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER'
}

export const AuthorizationPage = ({ type }) => {

    const getElement = () => {
        switch (type) {
            case AUTHORIZATION_TYPES.LOGIN:
                return (
                    <>
                        <LoginForm className={globalStyles.width_50}/>
                        <InfoBlock className={globalStyles.width_50}/>
                    </>
                )
            case AUTHORIZATION_TYPES.WHO:
                return <RoleChoose/>
            case AUTHORIZATION_TYPES.REGISTER:
                return (
                    <>
                        <RegisterForm className={globalStyles.width_50}/>
                        <InfoBlock className={globalStyles.width_50}/>
                    </>
                )
        }
    }

    return (
        <div className={cn(styles.auth_page)}>
            <FlexLayout isAdaptive type={LAYOUT_TYPES.HORIZONTAL} className={globalStyles.gap4} noPaddingMobile>
                {getElement()}
            </FlexLayout>
        </div>
    )
}