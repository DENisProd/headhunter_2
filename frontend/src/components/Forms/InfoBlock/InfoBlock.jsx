import React from 'react'

import Girl from '../../../assets/girl.svg'
import Man from '../../../assets/man.svg'
import {FlexLayout, LAYOUT_TYPES} from '../../ui/Layout/FlexLayout/FlexLayout'
import globalStyles from "../../../styles/global.module.scss";

function InfoBlock() {
  return (
    <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={globalStyles.center}>
      <h1 className={globalStyles.margin_block_0}>HeadHunter DSTU</h1>

      <p>Добро пожаловать на наш сайт по поиску работы и стажировок для студентов! Мы рады приветствовать вас и помочь вам начать вашу карьеру. Ниже представлено описание страницы регистрации, где вы сможете создать свой профиль и начать искать лучшие возможности для стажировок и трудоустройства.</p>

      <FlexLayout className={globalStyles.between}>
            <img src={Man}/>
            <img src={Girl}/>
      </FlexLayout>
    </FlexLayout>
  )
}

export default InfoBlock