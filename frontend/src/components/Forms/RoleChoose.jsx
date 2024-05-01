import React from 'react'
import { FlexLayout, LAYOUT_TYPES } from '../ui/Layout/FlexLayout/FlexLayout'
import globalStyles from '../../styles/global.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import Tile from '../ui/Tile/Tile'
import styles from "./auth.module.scss"

import Student from "../../assets/student-cap-svgrepo-com.svg"
import Employer from "../../assets/pen-svgrepo-com.svg"
import Briefcase from "../../assets/briefcase-svgrepo-com.svg"

import Art1 from '../../assets/art1.svg'
import Art2 from '../../assets/art2.svg'
import Art3 from '../../assets/art3.svg'
import {useDispatch} from "react-redux";
import {setRole} from "../../store/slices/userSlice.js";
import cn from "classnames";
import {Typography} from "../ui/Typography/Typography";

function RoleChoose() {
      const navigate = useNavigate()
      const dispatch = useDispatch();

      const chooseRole = (role) => {
            console.log(role)
            if (Number(role) === 3) {
                  console.log('/reg/main')
                  navigate('/register/main')
            }
            if (Number(role) === 2) navigate('/register/main')
            else navigate('/register/main')
            // else navigate('/login')
            dispatch(setRole(role));
      }
  return (
    <FlexLayout type={LAYOUT_TYPES.VERTICAL} noPaddingMobile>
      {/*<h1 className={globalStyles.center}>Ваш статус: </h1>*/}
          <Typography variant="h1" center>Ваш статус: </Typography>
      <FlexLayout className={globalStyles.flex_container} noPaddingMobile>
            <Tile props={{
                  onClick: () => chooseRole(1),
                  classNames: cn(globalStyles.center, globalStyles.width_30, styles.card)
            }}>
                  <img src={Student} className={styles.art}/>
                  <p className={globalStyles.bold_text}>Я студент</p>
            </Tile>

            <Tile props={{
                  onClick: () => chooseRole(3),
                  classNames: cn(globalStyles.center, globalStyles.width_30, styles.card)
            }}>
                  <img src={Employer} className={styles.art}/>
                  <p className={globalStyles.bold_text}>Я работодатель</p>
            </Tile>

            <Tile props={{
                  onClick: () => chooseRole(2),
                  classNames: cn(globalStyles.center, globalStyles.width_30, styles.card)
            }}>
                  <img src={Briefcase} className={styles.art}/>
                  <p className={globalStyles.bold_text}>Я выпускник</p>
            </Tile>
      </FlexLayout>
    </FlexLayout>
  )
}

export default RoleChoose