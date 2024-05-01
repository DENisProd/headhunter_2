import styles from './button.module.scss'
import cn from 'classnames'

export const BUTTON_TYPES = {
    PRIMARY: 'PRIMARY',
    SECONDARY: 'SECONDARY',
    SMALL: 'SMALL'
}

export const Button = ({ type, children, buttonProps, isShort, onClick, disabled, isAdaptive }) => {

    const getStyle = () => {
        let style = null

        switch (type) {
            case BUTTON_TYPES.PRIMARY:
                style = styles.primary
                break
            case BUTTON_TYPES.SECONDARY:
                style = styles.secondary
                break
            case BUTTON_TYPES.SMALL:
                style = styles.small
                break
            default:
                style = styles.primary
        }

        return cn(styles.button, style, isShort && styles.short, isAdaptive && styles.adaptive, buttonProps?.classNames)
    }

    return (
        <button className={getStyle()} {...buttonProps} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}