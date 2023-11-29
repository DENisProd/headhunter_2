import React from 'react'
import styles from "./History.module.scss"
import image114 from '../../images/image114.png'
import Group1 from '../../images/Group1.png'
import Header from '../../components/Header/Header'

const History = () => {
    return (
      <div>
      <div className={styles.block_history}>
         <div className={styles.panel_history}>
          <img src={Group1} alt=""/><h4> История </h4>
          </div>
      </div>
      <div className={styles.data}>
      <h3>Профиль</h3>
      <h3>Дата</h3>    
      </div>
      <div className={styles.block_users}>
           <img src={image114} alt="Фото"/>
    <div className={styles.info_data}>
    
     <div className={styles.info}>
      <h2>ФИО</h2>
      <p>Должность</p>
      </div>
      <div className={styles.data_user}>
          <p>Дата</p>
      </div>
    </div>
      </div>
      </div>
    )
  }
  
  export default History