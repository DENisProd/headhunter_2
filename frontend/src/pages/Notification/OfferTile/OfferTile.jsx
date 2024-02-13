import React from 'react';
import Tile from "../../../components/ui/Tile/Tile.jsx";
import globalStyles from "../../../styles/global.module.scss";
import cn from "classnames";
import styles from "../../../components/StudentCard/student-card.module.scss";
import Avatar from "../../../assets/avatars/avatar1.png";
import {Button, BUTTON_TYPES} from "../../../components/ui/Button/Button";
import {useSelector} from "react-redux";

const OfferTile = ({offer}) => {
    const userData = useSelector(state => state.userState)

    return (
        <Tile props={{
            classNames: cn(globalStyles.start, globalStyles.flex_grow_0, styles.with_hover),
        }}>
            <div className={cn(styles.container, styles.offer)}>
                <div className={styles.avatar}>
                    <picture>
                        <img src={Avatar}/>
                    </picture>
                </div>

                <div>
                    {offer?.student?.lastName} {offer?.student?.firstName} {offer?.student?.patronymic}:{" "}
                    Приглашение на собеседование
                </div>

                <div className={styles.right_container}>


                    <div>
                        <span>{offer.confirmed ? 'Подтверждено' : 'Нет ответа'}</span>
                    </div>

                    <div style={{gap: '1rem'}}>
                        {userData?.role !== "employer" &&
                            <>
                                <Button isShort>Принять</Button>
                                <Button isShort type={BUTTON_TYPES.SECONDARY}>Отклонить</Button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </Tile>
    );
};

export default OfferTile;