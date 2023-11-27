import React from 'react'
import cn from 'classnames'
import styles from './tile.module.scss'

function Tile({ children, props }) {
  return (
    <div className={cn(styles.container, props?.classNames)} {...props}>
            {children}
    </div>
  )
}

export default Tile