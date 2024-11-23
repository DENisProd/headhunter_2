import styles from './custom-bar-chart.module.scss'
import {useEffect, useState} from "react";
import useLongTouch from "../../../hooks/useLongTouch.js";
import cn from "classnames";

export const BarColumn = ({ color, text, tooltipText, height, id, onSelect }) => {

    const [isLongTouch, setIsLongTouch] = useState(false)

    useEffect(() => {
        hoverHandler(isLongTouch)
    }, [isLongTouch])

    const longTouch = useLongTouch(300, setIsLongTouch, 10)
    const hoverHandler = (event) => {

    }
    const clickHandler = (event) => {
        if (onSelect) onSelect(id, color)
    }

    return (
        <div className={styles.col}
             key={id}
             onTouchStart={longTouch.touchstart}
             onTouchEnd={longTouch.touchend}
             name={id}
             onMouseEnter={longTouch.touchstart}
             onMouseLeave={longTouch.touchend}
             onClick={clickHandler}
        >
            <div className={styles.bar} style={{ height: `calc(${height} * 20rem + 1rem)`, background: `var(${color})` }}/>
            <div className={styles.divider}/>
            <div>{ +text>0 ? +text : "- "}₽</div>
            <div className={cn(styles.hover_block, isLongTouch && styles.visible)}>
                {tooltipText}
            </div>
        </div>
    )
}