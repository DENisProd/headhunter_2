import {FlexLayout} from "../ui/Layout/FlexLayout/FlexLayout";
import styles from './student-card.module.scss'
import globalStyles from "../../styles/global.module.scss";
import Tile from "../ui/Tile/Tile.jsx";
import cn from "classnames";

export const StudentCard = ({ student, inFavorites, updateFavorites }) => {

    const addToFavorites = () => {
        let favs = JSON.parse(localStorage.getItem('favorites'))
        if (Array.isArray(favs)) favs.push(student)
        else favs = [ student ]
        localStorage.setItem('favorites', JSON.stringify(favs))
        updateFavorites()
    }

    return (
        <Tile props={{
            classNames: cn(globalStyles.start, globalStyles.flex_grow_0)
        }}>
            <div className={styles.container}>
                <div>

                </div>

                <div className={globalStyles.start}>
                    {student.lastName} {student.firstName} {student.patronymic}
                </div>

                <div className={globalStyles.start}>
                    {student.total}
                </div>

                <div className={globalStyles.start}>
                    {student.skills}
                </div>

                <div>
                    {inFavorites ?
                        <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={addToFavorites}>
                            <g id="heart.fill" clipPath="url(#clip0_1624_63)">
                                <g id="Group">
                                    <path id="Vector" d="M11.9179 22.2305C12.1641 22.2305 12.5156 22.0664 12.7734 21.9141C19.371 17.6953 23.5546 12.7852 23.5546 7.79297C23.5546 3.64453 20.7071 0.714844 17.0273 0.714844C14.7421 0.714844 12.9844 1.98047 11.9179 3.91406C10.875 1.99219 9.09375 0.714844 6.80859 0.714844C3.12891 0.714844 0.28125 3.64453 0.28125 7.79297C0.28125 12.7852 4.46484 17.6953 11.0743 21.9141C11.3204 22.0664 11.6718 22.2305 11.9179 22.2305Z" fill="#80889D"/>
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_1624_63">
                                    <rect width="23.2734" height="22.2305" fill="white" transform="translate(0.28125)"/>
                                </clipPath>
                            </defs>
                        </svg>
                        :
                        <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={addToFavorites}>
                            <g id="heart" clipPath="url(#clip0_1624_59)">
                                <g id="Group">
                                    <path id="Vector"
                                          d="M0.28125 7.79297C0.28125 12.7852 4.46484 17.6953 11.0743 21.9141C11.3204 22.0664 11.6718 22.2305 11.9179 22.2305C12.1641 22.2305 12.5156 22.0664 12.7734 21.9141C19.371 17.6953 23.5546 12.7852 23.5546 7.79297C23.5546 3.64453 20.7071 0.714844 16.9102 0.714844C14.7422 0.714844 12.9844 1.74609 11.9179 3.32812C10.875 1.75781 9.09375 0.714844 6.92578 0.714844C3.12891 0.714844 0.28125 3.64453 0.28125 7.79297ZM2.16797 7.79297C2.16797 4.67578 4.18359 2.60156 6.90234 2.60156C9.10547 2.60156 10.371 3.97266 11.121 5.14453C11.4374 5.61328 11.6367 5.74219 11.9179 5.74219C12.1992 5.74219 12.3751 5.60156 12.7149 5.14453C13.5235 3.99609 14.7421 2.60156 16.9335 2.60156C19.6523 2.60156 21.6679 4.67578 21.6679 7.79297C21.6679 12.1523 17.0625 16.8516 12.1641 20.1094C12.0469 20.1914 11.9648 20.25 11.9179 20.25C11.871 20.25 11.7891 20.1914 11.6835 20.1094C6.77344 16.8516 2.16797 12.1523 2.16797 7.79297Z"
                                          fill="#80889D"/>
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_1624_59">
                                    <rect width="23.2734" height="22.2305" fill="white" transform="translate(0.28125)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    }
                </div>
            </div>
        </Tile>
    )
}