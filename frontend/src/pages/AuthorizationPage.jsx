import {RegisterForm} from "../components/Forms/RegisterForm";
import InfoBlock from "../components/Forms/InfoBlock/InfoBlock";
import { FlexLayout, LAYOUT_TYPES } from "../components/ui/Layout/FlexLayout/FlexLayout";
import styles from './authorization-page.module.scss'
import globalStyles from '../styles/global.module.scss'
import cn from 'classnames'
import {LoginForm} from "../components/Forms/LoginForm";

export const AUTHORIZATION_TYPES = {
    WHO: 'WHO',
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER'
}

export const AuthorizationPage = ({ type }) => {
    return (
        <div className={cn(styles.auth_page)}>
            <FlexLayout isAdaptive type={LAYOUT_TYPES.HORIZONTAL} className={globalStyles.gap4}>
                <LoginForm className={globalStyles.width_50}/>
                {/*<RegisterForm className={globalStyles.width_50}/>*/}
                <InfoBlock className={globalStyles.width_50}/>
            </FlexLayout>
        </div>
    )
}