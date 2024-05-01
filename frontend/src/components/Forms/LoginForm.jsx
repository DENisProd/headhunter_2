import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FlexLayout, LAYOUT_TYPES} from "../ui/Layout/FlexLayout/FlexLayout.jsx";
import {Button, BUTTON_TYPES} from "../ui/Button/Button.jsx";
import {useLoginUserMutation, useRegisterUserMutation} from "../../store/api/userApi.js";
import {TextField} from "../ui/TextInput/TextField.jsx";
import styles from './form.module.scss'
import {Checkbox} from "../ui/Checkbox/Checkbox";
import globalStyles from "../../styles/global.module.scss";
import cn from "classnames";

export const LoginForm = () => {
    const [loginUser, {error}] = useLoginUserMutation()
    const navigate = useNavigate()
    const isAuth = useSelector((state) => state.userState.isAuth)
    const [errorLabel, setErrorLabel] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm()

    useEffect(() => {
        // if (isAuth) navigate('/profile')
    }, [isAuth])

    const onSubmit = (data) => {
        const user = {
            email: data.email,
            password: data.password,
        };

        loginUser(user)
            .then((data) => {
                if (data?.data?.accessToken) {
                    localStorage.setItem('token', data?.data?.accessToken)
                    localStorage.setItem('refresh_token', data?.data?.refreshToken)
                    navigate('/profile')
                } else {
                    setErrorLabel(data?.error?.data?.message)
                    console.log(data?.error?.status)
                }
            })
            .catch((er) => {
                console.log(er)
                setErrorLabel(er.message)
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h2 className={styles.header_text}>Вход</h2>
                <FlexLayout type={LAYOUT_TYPES.VERTICAL} noPaddingMobile>

                    <TextField fieldProps={{
                        type: 'email',
                        placeholder: 'Введите email',
                        ...register("email", {required: "Введите почту", pattern: { value: /^\S+@\S+$/i, message: "Введите почту"}})
                    }}
                               title={"Email"}
                               message={errors?.email && errors?.email?.message }
                               isError={errors?.email}
                    />

                    <TextField fieldProps={{
                        type: 'password',
                        placeholder: 'Введите пароль',
                        ...register("password", {
                            required: "Введите пароль",
                        })
                    }}
                               title={"Пароль"}
                               message={errors?.password && errors?.password?.message}
                               isError={errors?.password}
                    />

                    <FlexLayout className={cn(globalStyles.between, globalStyles.padding_0)}>
                        <Checkbox inputProps={{
                            ...register("remember")
                        }}/>
                        <div>Запомнить меня</div>
                    </FlexLayout>

                    <div>{errorLabel}</div>

                    <Button disabled={!isValid} buttonProps={{
                        type: 'submit'
                    }}>
                        Войти
                    </Button>

                    <Button type={BUTTON_TYPES.SECONDARY} buttonProps={{
                        type: 'submit'
                    }}>
                        Войти через ДГТУ.Цифра
                    </Button>

                    <div className={styles.link}>
                        <Link to={"/register/"}>Создать аккаунт</Link>
                    </div>
                </FlexLayout>
            </form>
        </>
    )
}