import styles from './text-field.module.scss'
import cn from "classnames";

export const TextField = ({ fieldProps, message, title, isError = false }) => {
    return (
        <div className={cn(styles.field_container, isError && styles.error)}>
            <label>{title}</label>
            <input {...fieldProps} />
            {message && <p>{ message }</p>}
        </div>
    )
}