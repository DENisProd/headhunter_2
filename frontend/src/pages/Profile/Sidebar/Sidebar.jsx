import styles from './sidebar.module.scss'
import {FlexLayout, LAYOUT_TYPES} from "../../../components/ui/Layout/FlexLayout/FlexLayout";
import cn from 'classnames'
import AvatarIcon from '../../../assets/avatar.png'
import globalStyles from "../../../styles/global.module.scss";
import {useSelector} from "react-redux";

export const Sidebar = () => {
    const data = {
        lastName: 'Иванов',
        firstName: 'Иван',
        patronymic: 'Иванович'
    }

    const userState = useSelector((state) => state.userState)

    return (
        <aside className={cn(globalStyles.center, globalStyles.width_30)}>
            <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.center)}>
                <h3>Профиль ID: {userState.user?.userId}</h3>
                <img src={AvatarIcon} className={globalStyles.big_avatar}/>
                <h4>{data.lastName + " " + data.firstName + " " + data.patronymic}</h4>

                <div>
                    <h4 className={globalStyles.margin_block_0}>E-mail</h4>
                    <h6 className={globalStyles.margin_block_0}>email.ru</h6>

                    <h4 className={globalStyles.margin_block_0}>Телефон</h4>
                    <h6 className={globalStyles.margin_block_0}>8******</h6>
                </div>
            </FlexLayout>
        </aside>
    )
}