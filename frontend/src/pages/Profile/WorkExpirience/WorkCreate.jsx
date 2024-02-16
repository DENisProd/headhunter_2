import {useAddWorkExpMutation} from "../../../store/api/userApi.js";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {TextField} from "../../../components/ui/TextInput/TextField.jsx";
import {FlexLayout} from "../../../components/ui/Layout/FlexLayout/FlexLayout.jsx";
import ToggleButton from "../../../components/ui/ToggleButton/ToggleButton.jsx";
import {Button, BUTTON_TYPES} from "../../../components/ui/Button/Button.jsx";
import cn from "classnames";
import globalStyles from "../../../styles/global.module.scss";
import Tile from "../../../components/ui/Tile/Tile.jsx";

export const WorkCreate = ({setIsAdd, closeAdding, getProfile}) => {
    const [addEducation, {error}] = useAddWorkExpMutation()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const onSubmitAddEducation = (data) => {
        const _data = {
            name: data.name,
            specialization: data.specialization,
            start: data.start,
            end: data.end
        }

        addEducation(_data).then(res => {
            getProfile()
            setIsAdd(false)
        }).catch(err => console.log(err))
    }

    return (
        <Tile props={{
            classNames: cn(globalStyles.start)
        }}>
            <form onSubmit={handleSubmit(onSubmitAddEducation)}>
                <p>
                    Место работы
                    <TextField fieldProps={{
                        type: 'text',
                        placeholder: 'Введите название работы',
                        ...register("name", {required: true})
                    }}
                        // message={errors?.email?.type === "required" ? 'Введите название!' : ''}
                    />
                </p>

                <p>
                    Обязанности на рабочем месте
                    <TextField fieldProps={{
                        type: 'text',
                        placeholder: 'Введите ваши обязанности ',
                        ...register("specialization")
                    }}
                        // message={errors?.email?.type === "required" ? 'Введите название!' : ''}
                    />
                </p>

                <p>
                    Начало работы
                    <TextField fieldProps={{
                        type: 'text',
                        placeholder: 'Начало работы',
                        ...register("start")
                    }}
                        // message={errors?.email?.type === "required" ? 'Введите название!' : ''}
                    />
                </p>
                <p>
                    Конец работы
                    <TextField fieldProps={{
                        type: 'text',
                        placeholder: 'Конец работы',
                        ...register("end")
                    }}
                        // message={errors?.email?.type === "required" ? 'Введите название!' : ''}
                    />
                </p>
                <FlexLayout>
                    <Button type={BUTTON_TYPES.PRIMARY} isShort buttonProps={{
                        type: 'submit'
                    }}>Сохранить</Button>
                    <Button type={BUTTON_TYPES.SECONDARY} isShort
                            onClick={() => setIsAdd(false)}>Отменить</Button>
                </FlexLayout>
            </form>
        </Tile>
    )
}