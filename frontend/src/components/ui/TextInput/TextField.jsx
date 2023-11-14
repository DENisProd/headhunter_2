import styles from './text-field.module.scss'

export const TextField = ({ fieldProps, message }) => {
    return (
        <div className={styles.field_container}>
            <input {...fieldProps} />
            {message && <p>{ message }</p>}
        </div>
    )
}