import React from 'react'
import { FlexLayout, LAYOUT_TYPES } from '../ui/Layout/FlexLayout/FlexLayout'
import globalStyles from '../../styles/global.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import Tile from '../ui/Tile/Tile'

import Art1 from '../../assets/art1.svg'
import Art2 from '../../assets/art2.svg'
import Art3 from '../../assets/art3.svg'
import {useDispatch} from "react-redux";
import {setRole} from "../../store/slices/userSlice.js";

function RoleChoose() {
      const navigate = useNavigate()
      const dispatch = useDispatch();

      const chooseRole = (role) => {
            if (Number(role) === 3) navigate('/register/main')
            else navigate('/login')
            dispatch(setRole(role));
      }
  return (
    <FlexLayout type={LAYOUT_TYPES.VERTICAL}>
      <h1>Кто вы</h1>

      <FlexLayout>
            <Tile props={{
                  onClick: () => chooseRole(1),
                  classNames: globalStyles.center
            }}>
                  <img src={Art1}/>
                  <p>Я студент</p>
            </Tile>

            <Tile props={{
                  onClick: () => chooseRole(2),
                  classNames: globalStyles.center
            }}>
                  <img src={Art2}/>
                  <p>Я выпускник</p>
            </Tile>

            <Tile props={{
                  onClick: () => chooseRole(3),
                  classNames: globalStyles.center
            }}>
                  <img src={Art3}/>
                  <p>Я работодатель</p>
            </Tile>
      </FlexLayout>
    </FlexLayout>
  )
}

export default RoleChoose