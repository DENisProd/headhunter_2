import AvatarIcon from "../../../assets/avatar.png";
import styles from './avatar.module.scss';

export const Avatar = ({ image }) => {
    return (
        <>
            <img className={styles.avatar} src={image || AvatarIcon}/>
        </>
    )
}

export default Avatar