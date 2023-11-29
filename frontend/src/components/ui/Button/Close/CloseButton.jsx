import styles from './close-button.module.scss'
import cn from 'classnames'

export const CloseButton = (props) => {
    return (
        <button className={cn(styles.button, props?.className)} {...props}>
            Закрыть
        </button>
    )
}