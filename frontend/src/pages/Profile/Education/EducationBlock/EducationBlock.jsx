import {TextField} from "../../../../components/ui/TextInput/TextField.jsx";
import {FlexLayout} from "../../../../components/ui/Layout/FlexLayout/FlexLayout.jsx";
import {Button, BUTTON_TYPES} from "../../../../components/ui/Button/Button.jsx";
import ToggleButton from "../../../../components/ui/ToggleButton/ToggleButton.jsx";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useAddEducationMutation} from "../../../../store/api/userApi.js";

const EducationBlock = ({ getProfile, setIsAddingEdu }) => {
    const [addEducation, {error}] = useAddEducationMutation()
    const [isCourse, setIsCourse] = useState(false)

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

        addEducation(_data).then(res => {
            getProfile()
            setIsAddingEdu(false)
        }).catch(err => console.log(err))
    }

    return (
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

            {!isCourse && (
                <>
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
                </>
            )}

            <p>
                Период обучения
                <TextField fieldProps={{
                    type: 'text',
                    placeholder: 'Введите период обучения',
                    ...register("period")
                }}
                    // message={errors?.email?.type === "required" ? 'Введите название!' : ''}
                />
            </p>
            <FlexLayout>
                <span>Добавление курса</span>
                <ToggleButton isOn={isCourse} toggle={setIsCourse}/>
            </FlexLayout>
            <FlexLayout>
                <Button type={BUTTON_TYPES.PRIMARY} isShort buttonProps={{
                    type: 'submit'
                }}>Сохранить</Button>
                <Button type={BUTTON_TYPES.SECONDARY} isShort onClick={() => setIsAddingEdu(false)}>Отменить</Button>
            </FlexLayout>
        </form>
    )
}

export default EducationBlock
