import { useForm } from "react-hook-form";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FlexLayout, LAYOUT_TYPES} from "../ui/Layout/FlexLayout/FlexLayout.jsx";
import {Button} from "../ui/Button/Button.jsx";
import {useRegisterUserMutation} from "../../store/api/userApi.js";
import {TextField} from "../ui/TextInput/TextField.jsx";
import styles from './form.module.scss'
import globalStyles from "../../styles/global.module.scss";
import {Checkbox} from "../ui/Checkbox/Checkbox.jsx";
import cn from "classnames";
import {Typography} from "../ui/Typography/Typography";

export const RegisterForm = () => {
    const [registerUser, { error }] = useRegisterUserMutation()
    const navigate = useNavigate()
    const isAuth = useSelector((state) => state.userState.isAuth)
    const role = useSelector(state => state.userState.role);
    const [errorLabel, setErrorLabel] = useState('')

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isValid },
    } = useForm({mode: "onBlur"})

    useEffect(() => {
        // if (isAuth) navigate('/profile')
    }, [isAuth])

    const onSubmit = (data) => {
        const user = {
            inn: data.inn,
            firstName: data.name,
            email: data.email,
            password: data.password,
            password2: data.password2,
            role
        };

        registerUser(user)
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
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                {/*<h2 className={styles.header_text}>Регистрация</h2>*/}
                <Typography variant="h2" center>Регистрация</Typography>
                <FlexLayout type={LAYOUT_TYPES.VERTICAL} noPaddingMobile>
                    {role === 3 ?
                        <TextField fieldProps={{
                            type: 'number',
                            placeholder: 'Введите ИНН',
                            ...register("inn", { required: true })
                        }}
                                   title={"ИНН вашей организации"}
                                   message={errors?.name?.type === "required" ? 'Введите ваш инн!' : ''}
                                   isError={error?.name}
                        />
                    :
                        <TextField fieldProps={{
                            type: 'text',
                            placeholder: 'Введите имя',
                            ...register("name", { required: true, maxLength: 100 })
                        }}
                                   title={"Ваше имя"}
                                   message={errors?.name?.type === "required" ? 'Введите ваше имя!' : ''}
                                   isError={error?.name}
                        />
                    }

                    <TextField fieldProps={{
                        type: 'email', placeholder: 'Введите email',
                        ...register("email", {required: "Введите почту", pattern: { value: /^\S+@\S+$/i, message: "Введите почту"}})
                    }}
                               title={"Ваш email"}
                               message={errors?.email && errors?.email?.message }
                               isError={error?.email}
                    />

                    <TextField fieldProps={{
                        type: 'password',
                        placeholder: 'Придумайте пароль',
                        ...register("password", {
                            required: "Введите пароль",
                            minLength: { value: 6, message: 'Пароль должен быть минимум 6 символов'}
                        })
                    }}
                               title={"Пароль"}
                               message={ errors?.password && errors?.password?.message }
                               isError={error?.password}
                    />

                    <TextField fieldProps={{
                        type: 'password',
                        placeholder: 'Повторите пароль',
                        ...register("password2", { validate: (value) => value === getValues("password") || "Пароли должны совпадать" })
                    }}
                               title={"Повтор пароля"}
                               message={errors?.password2 && errors?.password2?.message}
                               isError={error?.password2}
                    />

                    <FlexLayout className={cn(globalStyles.between, globalStyles.padding_0)} noPaddingMobile>
                        <Checkbox inputProps={{
                            ...register("agree")
                        }}/>
                        <div>Запомнить меня</div>
                    </FlexLayout>

                    <div>{errorLabel}</div>

                    <Button disabled={!isValid} buttonProps={{
                        type: 'submit'
                    }}>
                        Создать аккаунт
                    </Button>

                    <div className={styles.link}>
                        <Link to={"/login"}>У меня уже есть аккаунт</Link>
                    </div>
                </FlexLayout>
            </form>
        </>
    )
}