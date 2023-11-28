import React from 'react'
import styles from './header.module.scss'
import { FlexLayout } from '../ui/Layout/FlexLayout/FlexLayout'

import DSTULogo from '../../assets/dstu.svg'

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.inner}>
            <div className={styles.logo}>
                <img src={DSTULogo}/>
                  <span>HeadHunter</span>
            </div>

            {/*<nav>*/}
            {/*      <div>Главная</div>*/}
            {/*      <div>Заказы</div>*/}
            {/*      <div>Личный кабинет</div>*/}
            {/*</nav>*/}
      </div>
    </header>
  )
}

export default Header