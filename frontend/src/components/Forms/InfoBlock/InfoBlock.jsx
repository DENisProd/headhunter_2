import React from 'react'

import Girl from '../../../assets/girl.svg'
import Man from '../../../assets/man.svg'
import {FlexLayout, LAYOUT_TYPES} from '../../ui/Layout/FlexLayout/FlexLayout'
import globalStyles from "../../../styles/global.module.scss";
import styles from './info-block.module.scss'
import cn from 'classnames'
import {Typography} from "../../ui/Typography/Typography";
import {Button, BUTTON_TYPES} from "../../ui/Button/Button";

function InfoBlock() {
    return (
        <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.center, styles.container)}>
            <Typography variant="h2">Платформа поиска работы и стажировок</Typography>

            <FlexLayout className={cn(styles.img_container)} noPadding>
                <img src={Man}/>
                <img src={Girl}/>
            </FlexLayout>

            <p>Добро пожаловать на наш сайт по поиску работы и стажировок для студентов! Мы рады приветствовать вас и
                помочь вам начать вашу карьеру. Ниже представлено описание страницы регистрации, где вы сможете создать
                свой профиль и начать искать лучшие возможности для стажировок и трудоустройства.</p>
            <hr/>
            <FlexLayout className={cn(globalStyles.between)}>
                <Button type={BUTTON_TYPES.SMALL}>Узнать подробнее</Button>
                <div className={styles.arrow}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector"
                              d="M5.91878 13.3333L10.3094 8.94271C10.8279 8.42419 10.8279 7.5757 10.3094 7.05718L5.91878 2.66661"
                              stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </div>
            </FlexLayout>
        </FlexLayout>
    )
}

export default InfoBlock