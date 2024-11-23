import styles from './sidebar.module.scss'
import {FlexLayout, LAYOUT_TYPES} from "../../../components/ui/Layout/FlexLayout/FlexLayout";
import cn from 'classnames'
import AvatarIcon from '../../../assets/avatar.png'
import globalStyles from "../../../styles/global.module.scss";
import {useSelector} from "react-redux";
import Tile from "../../../components/ui/Tile/Tile.jsx";
import ToggleButton from "../../../components/ui/ToggleButton/ToggleButton.jsx";
import {useEffect, useState} from "react";
import Avatar from "../../../components/ui/Avatar/Avatar.jsx";
import {Typography} from "../../../components/ui/Typography/Typography";
import {useToggleIsWorkMutation} from "../../../store/api/userApi.js";

export const Sidebar = () => {
    const userState = useSelector((state) => state.userState)
    const [wantWork, setWantWork] = useState(userState?.profile?.isWorkSearch || false)

    const [ toggleIsWork ] = useToggleIsWorkMutation()

    useEffect(() => {
        if (userState?.profile) {
            setWantWork(userState?.profile?.isWorkSearch)
        }
    }, [userState?.profile])

    const toggle = (data) => {
        setWantWork(!wantWork)
        toggleIsWork()
    }

    return (
        <aside className={cn(globalStyles.center, globalStyles.width_30, styles.aside)}>
            <Tile>
                <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.center)} noPadding>
                    <Avatar image={userState?.user?.avatar}/>
                    {/*<Typography variant="h5" noMargin>Профиль ID: {userState?.user?.id}</Typography>*/}

                    <div className={styles.text_container}>
                        <Typography variant="h4" noMargin>{userState?.profile?.lastName}{" "}{userState?.profile?.firstName}{" "}{userState?.profile?.patronymic}</Typography>
                        {/*<Typography variant="h4" noMargin>E-mail</Typography>*/}
                        <Typography variant="p">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="vuesax/linear/sms">
                                    <g id="sms">
                                        <path id="Vector" d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="var(--app-contrast-bg)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path id="Vector_2" d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" stroke="var(--app-contrast-bg)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    </g>
                                </g>
                            </svg>
                            <span>{userState.user?.email}</span>
                        </Typography>
                        <Typography variant="p">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18" fill="none">
                                <path d="M18.9459 0.733006L1.21586 7.57001C0.00585645 8.05601 0.0128566 8.73101 0.993857 9.03201L5.54586 10.452L16.0779 3.80701C16.5759 3.50401 17.0309 3.66701 16.6569 3.99901L8.12386 11.7H8.12186L8.12386 11.701L7.80986 16.393C8.26986 16.393 8.47286 16.182 8.73086 15.933L10.9419 13.783L15.5409 17.18C16.3889 17.647 16.9979 17.407 17.2089 16.395L20.2279 2.16701C20.5369 0.928006 19.7549 0.367006 18.9459 0.733006Z" fill="var(--app-contrast-bg)"/>
                            </svg>
                            <span>@{userState.user?.telegram}</span>
                        </Typography>
                        {userState.role !== "employer" &&
                            <FlexLayout>
                                <div>Ищу работу</div>
                                <ToggleButton isOn={wantWork} toggle={toggle}/>
                            </FlexLayout>
                        }
                    </div>
                </FlexLayout>
            </Tile>
        </aside>
    )
}