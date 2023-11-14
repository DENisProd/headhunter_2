import styles from './button.module.scss'
import cn from 'classnames'

export const BUTTON_TYPES = {
    PRIMARY: 'PRIMARY',
    SECONDARY: 'SECONDARY'
}

export const Button = ({ type, children, buttonProps }) => {

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

        return cn(styles.button, style)
    }

    return (
        <button className={getStyle()} {...buttonProps}>
            {children}
        </button>
    )
}