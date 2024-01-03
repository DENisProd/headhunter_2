import React from 'react';
import Tile from "../../../components/ui/Tile/Tile.jsx";
import globalStyles from "../../../styles/global.module.scss";
import {FlexLayout} from "../../../components/ui/Layout/FlexLayout/FlexLayout";
import cn from "classnames";
import styles from "../../../components/StudentCard/student-card.module.scss";
import Avatar from "../../../assets/avatars/avatar1.png";

const OfferTile = ({ offer }) => {
    return (
        <Tile props={{
            classNames: cn(globalStyles.start, globalStyles.flex_grow_0, styles.with_hover),
        }}>
            <div className={styles.container}>
                <div className={styles.avatar}>
                    <picture>
                        <img src={Avatar}/>
                    </picture>
                </div>

                <div>
                    {offer.student.lastName} {offer.student.firstName} {offer.student.patronymic}
                </div>

                <div>
                    <span>{offer.confirmed ? 'Подтверждено' : 'Нет ответа'}</span>
                </div>
            </div>
        </Tile>
    );
};

export default OfferTile;