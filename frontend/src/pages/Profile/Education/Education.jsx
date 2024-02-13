import {FlexLayout, LAYOUT_TYPES} from "../../../components/ui/Layout/FlexLayout/FlexLayout";
import Tile from "../../../components/ui/Tile/Tile.jsx";
import globalStyles from "../../../styles/global.module.scss";
import React, {useState} from "react";

import styles from './education.module.scss'
import cn from "classnames";
import {Button, BUTTON_TYPES} from "../../../components/ui/Button/Button";
import {TextField} from "../../../components/ui/TextInput/TextField.jsx";
import {useForm} from "react-hook-form";
import {
    useEditStudentProfileMutation,
    useGetProfileMutation
} from "../../../store/api/userApi.js";
import {useSelector} from "react-redux";
import {RadarChart} from "../../../components/RadarChart/RadarChart";
import {Typography} from "../../../components/ui/Typography/Typography";
import EducationBlock from "./EducationBlock/EducationBlock.jsx";

export const Education = () => {
    const [isAddingEdu, setIsAddingEdu] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editStudentProfile, {errorw}] = useEditStudentProfileMutation()
    const [getProfile, {errorProfile}] = useGetProfileMutation()
    const user = useSelector(state => state.userState)

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const onSubmitEditProfileInfo = (data) => {
        editStudentProfile(data).then(res => {
            getProfile()
            setIsEdit(false)
        })
    }

    return (
        <>
            {user.role !== "employer" &&
                <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={globalStyles.padding_0}>
                    <Tile props={{
                        classNames: cn(globalStyles.start)
                    }}>
                        <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.padding_0)}>

                            {/*<h3 className={cn(globalStyles.margin_block_0, globalStyles.with_icon)}></h3>*/}
                            <Typography variant="h3" noMargin alignEnd>Образование {checked()}</Typography>
                            {user?.profile?.educations && user?.profile?.educations.map(edu =>
                                <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(styles.list)}>
                                    <div className={styles.row}>
                                        <h5 className={globalStyles.margin_block_0}>Образовательное учреждение</h5>
                                        <p className={globalStyles.margin_block_0}>{edu?.name}</p>

                                        <button className={styles.edit_btn}>{edit()}</button>
                                    </div>

                                    {edu?.specialization &&
                                        <div className={styles.row}>
                                            <h5 className={globalStyles.margin_block_0}>Направление обучения</h5>
                                            <p className={globalStyles.margin_block_0}>{edu?.specialization}</p>
                                        </div>
                                    }

                                    {edu?.faculty &&
                                        <div className={styles.row}>
                                            <h5 className={globalStyles.margin_block_0}>Факультет</h5>
                                            <p className={globalStyles.margin_block_0}>{edu?.faculty}</p>
                                        </div>
                                    }

                                    <div className={styles.row}>
                                        <h5 className={globalStyles.margin_block_0}>Период обучения</h5>
                                        <p className={globalStyles.margin_block_0}>{edu?.period}</p>
                                    </div>
                                </FlexLayout>
                            )}

                            {isAddingEdu ?
                                <EducationBlock getProfile={getProfile} setIsAddingEdu={setIsAddingEdu}/>
                                :
                                <>
                                    <Button type={BUTTON_TYPES.SECONDARY} isShort onClick={() => setIsAddingEdu(true)}>+ Добавить образование</Button>
                                </>
                            }

                        </FlexLayout>
                    </Tile>

                    {isEdit &&
                        <Tile props={{
                            classNames: globalStyles.start
                        }}>
                            <form onSubmit={handleSubmit(onSubmitEditProfileInfo)}>

                                <p>
                                    Сфера профессиональных интересов
                                    <TextField fieldProps={{
                                        type: 'text',
                                        placeholder: 'Введите ваши сферы профессиональных интересов',
                                        ...register("interests")
                                    }}/>
                                </p>

                                <p>
                                    Умения и навыки
                                    <TextField fieldProps={{
                                        type: 'text',
                                        placeholder: 'Введите ваши умения и навыки',
                                        ...register("skills")
                                    }}/>
                                </p>

                                <p>
                                    Фамилия
                                    <TextField fieldProps={{
                                        type: 'text',
                                        placeholder: 'Введите вашу фамилию',
                                        ...register("lastName")
                                    }}/>
                                </p>

                                <p>
                                    Имя
                                    <TextField fieldProps={{
                                        type: 'text',
                                        placeholder: 'Введите ваше имя',
                                        ...register("firstName")
                                    }}/>
                                </p>

                                <p>
                                    Отчество
                                    <TextField fieldProps={{
                                        type: 'text',
                                        placeholder: 'Введите ваше отчество (при наличии)',
                                        ...register("patronymic")
                                    }}/>
                                </p>

                                <p>
                                    Telegram
                                    <TextField fieldProps={{
                                        type: 'text',
                                        placeholder: '@user',
                                        ...register("telegram")
                                    }}/>
                                </p>

                                <FlexLayout>
                                    <Button type={BUTTON_TYPES.PRIMARY} isShort buttonProps={{
                                        type: 'submit'
                                    }}>Сохранить</Button>

                                    <Button type={BUTTON_TYPES.SECONDARY} isShort buttonProps={{
                                        onClick: () => setIsEdit(false),
                                    }}>Отменить</Button>
                                </FlexLayout>
                            </form>
                        </Tile>
                    }

                    <Tile props={{
                        classNames: globalStyles.start
                    }}>
                        <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.padding_0)}>
                            <Typography variant="h3" noMargin alignEnd>Цифровой портрет {checked()}</Typography>
                            {user?.profile && <RadarChart student={user?.profile} chartColor={'--primary-color'}/>}
                        </FlexLayout>
                    </Tile>

                    <Tile props={{
                        classNames: globalStyles.start
                    }}>
                        <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.padding_0)}>
                            <Typography variant="h3" noMargin alignEnd>О кандидате {notChecked()}</Typography>
                            <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(styles.list)}>
                                <div className={styles.row}>
                                    <h5 className={globalStyles.margin_block_0}>Сфера профессиональных интересов</h5>
                                    <p className={globalStyles.margin_block_0}>{user?.profile?.interests}</p>

                                    <button className={styles.edit_btn} onClick={() => setIsEdit(true)}>{edit()} </button>
                                </div>
                            </FlexLayout>

                            <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(styles.list)}>
                                <div className={styles.row}>
                                    <h5 className={globalStyles.margin_block_0}>Умения и навыки </h5>
                                    <p className={globalStyles.margin_block_0}>{user?.profile?.skills}</p>

                                    <button className={styles.edit_btn} onClick={() => setIsEdit(true)}>{edit()}</button>
                                </div>
                            </FlexLayout>
                        </FlexLayout>
                    </Tile>

                    <Tile props={{
                        classNames: globalStyles.start
                    }}>
                        <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.padding_0)}>
                            <Typography variant="h3" noMargin alignEnd>Личные данные {checked()}</Typography>
                            <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(styles.list)}>
                                <div className={styles.row}>
                                    <h5 className={globalStyles.margin_block_0}>ФИО</h5>
                                    <p className={globalStyles.margin_block_0}>{user?.profile?.lastName}{" "}{user?.profile?.firstName}{" "}{user?.profile?.patronymic}</p>

                                    <button className={styles.edit_btn} onClick={() => setIsEdit(true)}>{edit()}</button>
                                </div>
                            </FlexLayout>

                            <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(styles.list)}>
                                <div className={styles.row}>
                                    <h5 className={globalStyles.margin_block_0}>Телефон</h5>
                                    <p className={globalStyles.margin_block_0}>+7 (800) 555-35-35</p>

                                    <button className={styles.edit_btn} onClick={() => setIsEdit(true)}>{edit()}</button>
                                </div>
                            </FlexLayout>

                            <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(styles.list)}>
                                <div className={styles.row}>
                                    <h5 className={globalStyles.margin_block_0}>Telegram</h5>
                                    <p className={globalStyles.margin_block_0}>@{user?.user?.telegram}</p>

                                    <button className={styles.edit_btn} onClick={() => setIsEdit(true)}>{edit()}</button>
                                </div>
                            </FlexLayout>

                            <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(styles.list)}>
                                <div className={styles.row}>
                                    <h5 className={globalStyles.margin_block_0}>Подписка на уведомления</h5>
                                    <p className={globalStyles.margin_block_0}>Отключена</p>
                                </div>
                            </FlexLayout>

                            {/*<FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(styles.list)}>*/}
                            {/*    <div className={styles.row}>*/}
                            {/*        <h5 className={globalStyles.margin_block_0}>Двухфакторная аутентификация</h5>*/}
                            {/*        <p className={globalStyles.margin_block_0}>Отключена</p>*/}
                            {/*    </div>*/}
                            {/*</FlexLayout>*/}

                            {/*<FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(styles.list)}>*/}
                            {/*    <div className={styles.row}>*/}
                            {/*        <h5 className={globalStyles.margin_block_0}>Сменить пароль</h5>*/}
                            {/*        <p className={globalStyles.margin_block_0}>*/}
                            {/*            <Button type={BUTTON_TYPES.SECONDARY}>Сменить пароль</Button>*/}
                            {/*        </p>*/}
                            {/*    </div>*/}
                            {/*</FlexLayout>*/}
                        </FlexLayout>
                    </Tile>
                </FlexLayout>
            }
        </>
    )
}

const checked = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <path d="M12.2969 22.0159C17.7969 22.0159 22.2969 17.5159 22.2969 12.0159C22.2969 6.51585 17.7969 2.01585 12.2969 2.01585C6.79688 2.01585 2.29688 6.51585 2.29688 12.0159C2.29688 17.5159 6.79688 22.0159 12.2969 22.0159Z" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.04688 12.0159L10.8769 14.8458L16.5469 9.18585" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const notChecked = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <path d="M12.2969 22.0159C17.7969 22.0159 22.2969 17.5159 22.2969 12.0159C22.2969 6.51585 17.7969 2.01585 12.2969 2.01585C6.79688 2.01585 2.29688 6.51585 2.29688 12.0159C2.29688 17.5159 6.79688 22.0159 12.2969 22.0159Z" stroke="var(--accent-color-red)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.4668 14.8458L15.1268 9.18585" stroke="var(--accent-color-red)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.1268 14.8458L9.4668 9.18585" stroke="var(--accent-color-red)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export const edit = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30"
         viewBox="0 0 25 30"
         fill="none">
        <g clipPath="url(#clip0_1619_78)">
            <path
                d="M0.9375 25.7167H23.332C23.8477 25.7167 24.2812 25.2831 24.2812 24.7675C24.2812 24.2519 23.8477 23.83 23.332 23.83H0.9375C0.421875 23.83 0 24.2519 0 24.7675C0 25.2831 0.421875 25.7167 0.9375 25.7167Z"
                fill="#80889D"/>
            <path
                d="M5.74202 20.9473L9.63264 19.3417C9.92561 19.2245 10.0662 19.1191 10.242 18.9433L21.4568 7.81053C22.5584 6.72069 22.5467 5.44334 21.4334 4.31834L18.9725 1.83397C17.8475 0.720688 16.5701 0.697251 15.4686 1.7871L4.24202 12.9199C4.06624 13.0839 3.96077 13.2128 3.84358 13.5058L2.20295 17.3965C1.95686 17.9825 2.01545 18.5683 2.46077 19.0136L4.12483 20.6894C4.55842 21.123 5.14436 21.2051 5.74202 20.9473ZM5.56624 19.1308C5.33186 19.2128 5.15608 19.2128 4.94514 19.0019L4.14827 18.205C3.93733 17.9941 3.93733 17.8066 4.03108 17.5956L5.48421 14.1855L16.6521 3.09959C16.992 2.78319 17.3904 2.75975 17.7068 3.07616L20.1795 5.57225C20.4959 5.90038 20.4725 6.29881 20.1443 6.62694L8.97639 17.7129L5.56624 19.1308ZM1.17171 21.5331H2.58967C2.9178 21.5331 3.05842 21.4745 3.31624 21.2636L4.4178 20.42L2.7303 18.6973L0.831865 20.7011C0.480303 21.0644 0.656084 21.5331 1.17171 21.5331ZM4.4178 14.1855L9.21077 19.0019L10.3123 17.9121L5.51936 13.084L4.4178 14.1855ZM14.1443 4.541L18.9373 9.35741L20.0389 8.27928L15.2459 3.45116L14.1443 4.541Z"
                fill="#80889D"/>
        </g>
        <defs>
            <clipPath id="clip0_1619_78">
                <rect width="24.2812" height="28.0317" fill="white"
                      transform="translate(0 0.98415)"/>
            </clipPath>
        </defs>
    </svg>
)