import {FlexLayout, LAYOUT_TYPES} from "../../../../components/ui/Layout/FlexLayout/FlexLayout.jsx";
import {Typography} from "../../../../components/ui/Typography/Typography.jsx";
import cn from "classnames";
import globalStyles from "../../../../styles/global.module.scss";
import Tile from "../../../../components/ui/Tile/Tile.jsx";
import styles from "../../Education/education.module.scss";
import React, {useEffect} from "react";
import {edit} from "../../Education/Education.jsx";
import {useGetProfileMutation} from "../../../../store/api/userApi.js";
import {useDispatch, useSelector} from "react-redux";
import {Button, BUTTON_TYPES} from "../../../../components/ui/Button/Button";

export const About = () => {

    const [getProfile, {error}] = useGetProfileMutation()
    const userState = useSelector((state) => state.userState)

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <FlexLayout type={LAYOUT_TYPES.VERTICAL} noPadding>
            <Tile props={{
                classNames: cn(globalStyles.start)
            }}>
                <Typography variant="h4" noMargin>О компании</Typography>
                <FlexLayout type={LAYOUT_TYPES.VERTICAL}>
                    <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(styles.list)}>
                        <div className={styles.row}>
                            <h5 className={globalStyles.margin_block_0}>Название компании</h5>
                            <p className={globalStyles.margin_block_0}>{userState?.profile?.companyName}</p>
                        </div>

                        <div className={styles.row}>
                            <h5 className={globalStyles.margin_block_0}>ИНН организации</h5>
                            <p className={globalStyles.margin_block_0}>{userState?.profile?.inn}</p>
                        </div>

                        <div className={styles.row}>
                            <h5 className={globalStyles.margin_block_0}>Описание компании</h5>
                            <p className={globalStyles.margin_block_0}>{userState?.profile?.companyDescription?.text}</p>
                        </div>

                        <div className={styles.row}>
                            <h5 className={globalStyles.margin_block_0}>Адрес компании</h5>
                            <p className={globalStyles.margin_block_0}>{userState?.profile?.companyAddress}</p>
                        </div>
                    </FlexLayout>
                    <Button type={BUTTON_TYPES.SECONDARY} isShort>{edit()} Редактировать</Button>
                </FlexLayout>
            </Tile>
        </FlexLayout>
    )
}