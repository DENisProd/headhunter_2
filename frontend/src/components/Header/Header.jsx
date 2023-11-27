import React from 'react'
import styles from './header.module.scss'
import { FlexLayout } from '../ui/Layout/FlexLayout/FlexLayout'

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.inner}>
            <div className={styles.logo}>
                  HeadHunter DSTU
            </div>

            <nav>
                  <div>Главная</div>
                  <div>Заказы</div>
                  <div>Личный кабинет</div>
            </nav>
      </div>
    </header>
  )
}

export default Header