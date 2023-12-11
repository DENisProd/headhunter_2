import {FlexLayout, LAYOUT_TYPES} from "../../components/ui/Layout/FlexLayout/FlexLayout";
import globalStyles from "../../styles/global.module.scss";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Landing = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/login")
    }, [])

    return (
        <FlexLayout className={globalStyles.center} type={LAYOUT_TYPES.VERTICAL}>
            <h1>Привет! Это HeadHunter DSTU</h1>

            <p>Навигация</p>
            <ul>
                <li><Link to={'/login'}>Авторизация</Link></li>
                <li><Link to={'/register'}>Регистрация</Link></li>
                <li><Link to={'/profile'}>Профиль</Link></li>
            </ul>
        </FlexLayout>
    )
}

export default Landing