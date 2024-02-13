import styles from './details.module.scss'

export const Details = ({ children }) => {
    return (
        <details className={styles.details}>
            {children}
        </details>
    )
}