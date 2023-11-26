import React from 'react'

import Girl from '../../../assets/girl.svg'
import Man from '../../../assets/man.svg'
import { FlexLayout } from '../../ui/Layout/FlexLayout/FlexLayout'

function InfoBlock() {
  return (
    <div>
      <h1>HeadHunter DSTU</h1>

      <p>Добро пожаловать на наш сайт по поиску работы и стажировок для студентов! Мы рады приветствовать вас и помочь вам начать вашу карьеру. Ниже представлено описание страницы регистрации, где вы сможете создать свой профиль и начать искать лучшие возможности для стажировок и трудоустройства.</p>

      <FlexLayout>
            <img src={Man}/>
            <img src={Girl}/>
      </FlexLayout>
    </div>
  )
}

export default InfoBlock