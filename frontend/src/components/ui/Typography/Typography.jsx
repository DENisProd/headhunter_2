import cn from "classnames";
import styles from './typography.module.scss'

export const Typography = ({ noMargin, variant, children, center, alignEnd }) => {

    const getStyle = () => {
        return cn(styles.main, noMargin && styles.no_margin, center && styles.center, alignEnd && styles.align_end)
    }

    const getTag = () => {
        let result = null

        switch (variant) {
            case "h1":
                result = <h1 className={getStyle()}>{children}</h1>
                break
            case "h2":
                result = <h2 className={getStyle()}>{children}</h2>
                break
            case "h3":
                result = <h3 className={getStyle()}>{children}</h3>
                break
            case "h4":
                result = <h4 className={getStyle()}>{children}</h4>
                break
            case "h5":
                result = <h5 className={getStyle()}>{children}</h5>
                break
            case "p":
                result = <p className={getStyle()}>{children}</p>
                break
            default:
                result = <p className={getStyle()}>{children}</p>
                break
        }

        return result
    }

    return (
        <>
            {getTag()}
        </>
    )
}


// .modal-container .wait-block {
//     border-radius: 0.5rem;
//     background: linear-gradient(86deg, #F0F3F7 46.87%, #CED4DC 65.62%, #F0F3F7 94.27%);
//     display: flex;
//     width: 100%;
//     padding: 1.25rem 1rem;
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 1.25rem;
//     margin-bottom: 1rem;
//     margin-top: 1rem;
//     background-size: 200% 100%;
//     animation: moveBackground 1s linear infinite;
// }
// @keyframes moveBackground {
//     0% {
//         background-position: 0 0;
// }
//     100% {
//         background-position: 200% 0;
// }
// }