import {FlexLayout, LAYOUT_TYPES} from "../../../components/ui/Layout/FlexLayout/FlexLayout";
import Tile from "../../../components/ui/Tile/Tile.jsx";
import globalStyles from "../../../styles/global.module.scss";
import React, {useState} from "react";

import styles from './education.module.scss'
import cn from "classnames";
import {Button, BUTTON_TYPES} from "../../../components/ui/Button/Button";
import {TextField} from "../../../components/ui/TextInput/TextField.jsx";
import {useForm} from "react-hook-form";
import {useAddEducationMutation} from "../../../store/api/userApi.js";

export const Education = () => {
    const [isAddingEdu, setIsAddingEdu] = useState(false)

    const [addEducation, {error}] = useAddEducationMutation()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const onSubmitAddEducation = (data) => {
        const _data = {
            name: data.name,
            specialization: data.specialization,
            faculty: data.faculty,
            period: data.period
        }

        addEducation(_data).then(res => console.log(res)).catch(err => console.log(err))
    }

    return (
        <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={globalStyles.padding_0}>
            <Tile props={{
                classNames: cn(globalStyles.start)
            }}>
                <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.padding_0)}>

                    <h3 className={cn(globalStyles.margin_block_0, globalStyles.with_icon)}>Образование {checked()}</h3>

                    <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(styles.list)}>
                        <div className={styles.row}>
                            <h5 className={globalStyles.margin_block_0}>Образовательное учреждение</h5>
                            <p className={globalStyles.margin_block_0}>Донской Государственный Технический
                                университет</p>
                        </div>

                        <div className={styles.row}>
                            <h5 className={globalStyles.margin_block_0}>Направление обучения</h5>
                            <p className={globalStyles.margin_block_0}>10.03.01 Информационная безопасность</p>
                        </div>

                        <div className={styles.row}>
                            <h5 className={globalStyles.margin_block_0}>Факультет</h5>
                            <p className={globalStyles.margin_block_0}>Информатика и вычислительная техника</p>
                        </div>

                        <div className={styles.row}>
                            <h5 className={globalStyles.margin_block_0}>Период обучения</h5>
                            <p className={globalStyles.margin_block_0}>2020 - 2024</p>
                        </div>
                    </FlexLayout>

                    <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(styles.list)}>
                        <div className={styles.row}>
                            <h5 className={globalStyles.margin_block_0}>Образовательное учреждение</h5>
                            <p className={globalStyles.margin_block_0}>МБОУ СОШ №XXX</p>
                        </div>

                        <div className={styles.row}>
                            <h5 className={globalStyles.margin_block_0}>Период обучения</h5>
                            <p className={globalStyles.margin_block_0}>2009 - 2020</p>
                        </div>
                    </FlexLayout>

                    {isAddingEdu ?
                        <>
                            <form onSubmit={handleSubmit(onSubmitAddEducation)}>
                                <p>
                                    Название образовательного учреждения
                                    <TextField fieldProps={{
                                        type: 'text',
                                        placeholder: 'Введите название образовательного учреждения',
                                        ...register("name", {required: true})
                                    }}
                                               // message={errors?.email?.type === "required" ? 'Введите название!' : ''}
                                    />
                                </p>

                                <p>
                                    Направление обучения
                                    <TextField fieldProps={{
                                        type: 'text',
                                        placeholder: 'Введите ваше направление подготовки ',
                                        ...register("specialization")
                                    }}
                                        // message={errors?.email?.type === "required" ? 'Введите название!' : ''}
                                    />
                                </p>

                                <p>
                                    Факультет
                                    <TextField fieldProps={{
                                        type: 'text',
                                        placeholder: 'Введите ваш факультет ',
                                        ...register("faculty")
                                    }}
                                        // message={errors?.email?.type === "required" ? 'Введите название!' : ''}
                                    />
                                </p>

                                <p>
                                    Период обучения
                                    <TextField fieldProps={{
                                        type: 'text',
                                        placeholder: 'Введите период обучения',
                                        ...register("period", {required: true})
                                    }}
                                        // message={errors?.email?.type === "required" ? 'Введите название!' : ''}
                                    />
                                </p>
                                <Button type={BUTTON_TYPES.PRIMARY} isShort buttonProps={{
                                    //onClick: () => setIsAddingEdu(false),
                                    type: 'submit'
                                }}>Сохранить</Button>
                            </form>
                            </>
                    :
                        <>
                            <Button type={BUTTON_TYPES.SECONDARY} isShort buttonProps={{
                                onClick: () => setIsAddingEdu(true)
                            }}>+ Добавить образование</Button>
                        </>
                    }

                </FlexLayout>
            </Tile>
            <Tile props={{
                classNames: globalStyles.start
            }}>
                <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.padding_0)}>

                    <h3 className={cn(globalStyles.margin_block_0, globalStyles.with_icon)}>О кандидате {notChecked()}</h3>
                    <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(styles.list)}>
                        <div className={styles.row}>
                            <h5 className={globalStyles.margin_block_0}>Сфера профессиональных интересов</h5>
                            <p className={globalStyles.margin_block_0}>Изучение и внедрение новых образовательных технологий</p>
                        </div>
                    </FlexLayout>

                    <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(styles.list)}>
                        <div className={styles.row}>
                            <h5 className={globalStyles.margin_block_0}>Умения и навыки </h5>
                            <p className={globalStyles.margin_block_0}>Отличное знание теории предмета; Умение решать практические задачи; Социальная компетентность.</p>
                        </div>
                    </FlexLayout>
                </FlexLayout>
            </Tile>
        </FlexLayout>
    )
}

const checked = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11.04" fill="white" stroke="#27AE60" strokeWidth="1.92"/>
    <path d="M20.8427 6.31579L11.291 15.7895L6.31641 10.6407" stroke="#27AE60" strokeWidth="1.92" strokeLinecap="round"
          strokeLinejoin="round"/>
</svg>

const notChecked = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26" viewBox="0 0 28 26" fill="none">
    <g clipPath="url(#clip0_246_1578)">
        <rect width="28" height="26" fill="#FFF9F9"/>
        <path d="M14 24.375C20.7655 24.375 26.25 19.2822 26.25 13C26.25 6.71776 20.7655 1.625 14 1.625C7.23451 1.625 1.75 6.71776 1.75 13C1.75 19.2822 7.23451 24.375 14 24.375Z" stroke="#EC2525" strokeWidth="2" strokeMiterlimit="10"/>
        <path d="M19.565 7.83203L8.435 18.167" stroke="#EC2525" strokeWidth="2" strokeMiterlimit="10"/>
        <path d="M8.435 7.83203L19.565 18.167" stroke="#EC2525" strokeWidth="2" strokeMiterlimit="10"/>
    </g>
    <defs>
        <clipPath id="clip0_246_1578">
            <rect width="28" height="26" fill="white"/>
        </clipPath>
    </defs>
</svg>