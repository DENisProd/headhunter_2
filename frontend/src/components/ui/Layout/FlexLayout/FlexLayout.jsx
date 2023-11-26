import cn from "classnames";
import styles from './layout.module.scss'
import {BUTTON_TYPES} from "../../Button/Button.jsx";

const DEFAULT_MAX_WIDTH = 800

export const LAYOUT_TYPES = {
    VERTICAL: 'VERTICAL',
    HORIZONTAL: 'HORIZONTAL'
}

export const FlexLayout = ({ children, maxWidth, type, isAdaptive }) => {

    const getStyle = () => {
        let style = null

        switch (type) {
            case LAYOUT_TYPES.VERTICAL:
                style = styles.vertical
                break
            case LAYOUT_TYPES.HORIZONTAL:
                style = styles.horizontal
                break
            default:
                style = styles.horizontal
        }

        return cn(styles.container, style, isAdaptive && styles.isAdaptive)
    }

    return (
        <div className={getStyle()}>
            {children}
        </div>
    )
}