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

export const RegisterForm = () => {
    const [registerUser, { error }] = useRegisterUserMutation()
    const navigate = useNavigate()
    const isAuth = useSelector((state) => state.userState.isAuth)
    const [emailIsBusy, setEmailIsBusy] = useState(false)
    const role = useSelector(state => state.userState.role);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        // if (isAuth) navigate('/profile')
    }, [isAuth])

    const onSubmit = (data) => {
        const user = {
            firstName: data.name,
            email: data.email,
            password: data.password,
            password2: data.password2,
            role
        };

        console.log(user)

        registerUser(user)
            .then((data) => {
                if ((data.message = "Error: Email is already in use!")) {
                    setEmailIsBusy(true)
                }
                console.log(data)
                localStorage.setItem('token', data.accessToken)
                localStorage.setItem('refresh_token', data.refreshToken)
                navigate('/profile')
            })
            .catch((er) => {
                console.log(er)
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h2 className={styles.header_text}>Регистрация</h2>
                <FlexLayout type={LAYOUT_TYPES.VERTICAL}>
                    <TextField fieldProps={{
                        type: 'text',
                        placeholder: 'Введите имя',
                        ...register("name", { required: true, maxLength: 100 })
                    }}
                    message={errors?.name?.type === "required" ? 'Введите ваше имя!' : ''}
                    />

                    <TextField fieldProps={{
                        type: 'email',
                        placeholder: 'Введите email',
                        ...register("email", { required: true, pattern: /^\S+@\S+$/i })
                    }}
                               message={errors?.email?.type === "required" ? 'Введите вашу почту!' : ''}
                    />

                    <TextField fieldProps={{
                        type: 'password',
                        placeholder: 'Придумайте пароль',
                        ...register("password", { required: true, minLength: 6, maxLength: 12 })
                    }}
                               message={errors?.password?.type === "required" ? 'Придумайте пароль!' : ''}
                    />

                    <TextField fieldProps={{
                        type: 'password',
                        placeholder: 'Повторите пароль',
                        ...register("password2", { required: true, minLength: 6, maxLength: 12 })
                    }}
                               message={errors?.password2?.type === "required" ? 'Пароли не совпадают!' : ''}
                    />

                    <FlexLayout className={globalStyles.between}>
                        <Checkbox inputProps={{
                            ...register("agree")
                        }}/>
                        <div>Запомнить меня</div>
                    </FlexLayout>

                    {emailIsBusy && <p>Email уже занят!</p>}

                    <Button buttonProps={{
                        type: 'submit'
                    }}>
                        Создать аккаунт
                    </Button>

                    <div>
                        <Link to={"/login"}>У меня уже есть аккаунт</Link>
                    </div>
                </FlexLayout>
            </form>
        </>
    )
}