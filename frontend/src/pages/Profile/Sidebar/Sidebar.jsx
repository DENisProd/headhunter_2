import styles from './sidebar.module.scss'
import {FlexLayout, LAYOUT_TYPES} from "../../../components/ui/Layout/FlexLayout/FlexLayout";
import cn from 'classnames'
import AvatarIcon from '../../../assets/avatar.png'
import globalStyles from "../../../styles/global.module.scss";
import {useSelector} from "react-redux";
import Tile from "../../../components/ui/Tile/Tile.jsx";
import ToggleButton from "../../../components/ui/ToggleButton/ToggleButton.jsx";
import {useState} from "react";

export const Sidebar = () => {
    const userState = useSelector((state) => state.userState)
    const [wantWork, setWantWork] = useState(false)

    return (
        <aside className={cn(globalStyles.center, globalStyles.width_30, styles.aside)}>
            <Tile>
                <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.center)}>
                    <h3>Профиль ID: {userState?.user?.id}</h3>
                    <img src={AvatarIcon} className={globalStyles.big_avatar}/>
                    <h4>{userState?.profile?.lastName}{" "}{userState?.profile?.firstName}{" "}{userState?.profile?.patronymic}</h4>

                    <div>
                        <h4 className={globalStyles.margin_block_0}>E-mail</h4>
                        <h6 className={globalStyles.margin_block_0}>{userState.user?.email}</h6>

                        <h4 className={globalStyles.margin_block_0}>Телефон</h4>
                        <h6 className={globalStyles.margin_block_0}>8******</h6>

                        <ToggleButton isOn={wantWork} toggle={setWantWork}/>
                    </div>
                </FlexLayout>
            </Tile>
        </aside>
    )
}