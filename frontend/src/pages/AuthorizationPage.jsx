import {RegisterForm} from "../components/Forms/RegisterForm";
import InfoBlock from "../components/Forms/InfoBlock/InfoBlock";
import { FlexLayout, LAYOUT_TYPES } from "../components/ui/Layout/FlexLayout/FlexLayout";
import styles from './authorization-page.module.scss'
import globalStyles from '../styles/global.styles'
import cn from 'classnames'

export const AUTHORIZATION_TYPES = {
    WHO: 'WHO',
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER'
}

export const AuthorizationPage = ({ type }) => {
    return (
        <div className={cn(styles.auth_page)}>
            <FlexLayout isAdaptive type={LAYOUT_TYPES.HORIZONTAL}>
                <RegisterForm className={globalStyles.width_50}/>
                <InfoBlock className={globalStyles.width_50}/>
            </FlexLayout>
        </div>
    )
}