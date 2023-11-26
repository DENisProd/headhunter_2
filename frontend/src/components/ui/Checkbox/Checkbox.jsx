import cn from 'classnames'
import styles from './checkbox.module.scss'

export const Checkbox = ({ className, inputProps}) => {
    return <input type="checkbox" className={cn(className, styles.checkbox)} {...inputProps}/>
}