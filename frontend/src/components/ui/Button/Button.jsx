import styles from './button.module.scss'
import cn from 'classnames'

export const BUTTON_TYPES = {
    PRIMARY: 'PRIMARY',
    SECONDARY: 'SECONDARY'
}

export const Button = ({ type, children, buttonProps, isShort, onClick, disabled }) => {

    const getStyle = () => {
        let style = null

        switch (type) {
            case BUTTON_TYPES.PRIMARY:
                style = styles.primary
                break
            case BUTTON_TYPES.SECONDARY:
                style = styles.secondary
                break
            default:
                style = styles.primary
        }

        return cn(styles.button, style, isShort && styles.short, buttonProps?.classNames)
    }

    return (
        <button className={getStyle()} {...buttonProps} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}