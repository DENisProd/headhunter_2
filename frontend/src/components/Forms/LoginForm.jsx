import { useForm } from "react-hook-form";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FlexLayout, LAYOUT_TYPES} from "../ui/Layout/FlexLayout/FlexLayout.jsx";
import {Button, BUTTON_TYPES} from "../ui/Button/Button.jsx";
import {useRegisterUserMutation} from "../../store/api/userApi.js";
import {TextField} from "../ui/TextInput/TextField.jsx";
import styles from './form.module.scss'
import {Checkbox} from "../ui/Checkbox/Checkbox";
import globalStyles from "../../styles/global.module.scss";

export const LoginForm = () => {
    const [loginUser, { error }] = useRegisterUserMutation()
    // const navigate = useNavigate()
    const isAuth = useSelector((state) => state.userState.isAuth)
    const [emailIsBusy, setEmailIsBusy] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        // if (isAuth) navigate('/profile')
    }, [isAuth])

    const onSubmit = (data) => {
        console.log(data)
        const user = {
            email: data.email,
            password: data.password,
        };

        console.log(user)

        loginUser(user)
            .then((data) => {
                if ((data.message = "Error: Email is already in use!")) {
                    setEmailIsBusy(true)
                }
                console.log(data)
            })
            .catch((er) => {
                console.log(er)
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h2 className={styles.header_text}>Вход</h2>
                <FlexLayout type={LAYOUT_TYPES.VERTICAL}>

                    <TextField fieldProps={{
                        type: 'email',
                        placeholder: 'Введите email',
                        ...register("email", { required: true, pattern: /^\S+@\S+$/i })
                    }}
                               message={errors?.email?.type === "required" ? 'Введите вашу почту!' : ''}
                    />

                    <TextField fieldProps={{
                        type: 'password',
                        placeholder: 'Введите пароль',
                        ...register("password", { required: true, minLength: 6, maxLength: 12 })
                    }}
                               message={errors?.password?.type === "required" ? 'Введите пароль!' : ''}
                    />

                    <FlexLayout className={globalStyles.between}>
                        <Checkbox inputProps={{
                            ...register("remember")
                        }}/>
                        <div>Запомнить меня</div>
                    </FlexLayout>

                    {emailIsBusy && <p>Email уже занят!</p>}

                    <Button buttonProps={{
                        type: 'submit'
                    }}>
                        Войти
                    </Button>

                    <Button type={BUTTON_TYPES.SECONDARY} buttonProps={{
                        type: 'submit'
                    }}>
                        Войти через ДГТУ.Цифра
                    </Button>

                    <div>
                        <Link to={"/register"}>Создать аккаунта</Link>
                    </div>
                </FlexLayout>
            </form>
        </>
    )
}