import cn from "classnames";
import globalStyles from "../../../styles/global.module.scss";
import styles from './resume.module.scss'
import Tile from "../../../components/ui/Tile/Tile.jsx";
import {FlexLayout, LAYOUT_TYPES} from "../../../components/ui/Layout/FlexLayout/FlexLayout";
import Avatar from '../../../assets/avatar2.png'
import {Typography} from "../../../components/ui/Typography/Typography";
import {RadarChart} from "../../../components/RadarChart/RadarChart";
import {useSelector} from "react-redux";
import {Button} from "../../../components/ui/Button/Button";
import React, {useEffect, useRef, useState} from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {Link, useParams} from "react-router-dom";
import {useCreateOfferMutation, useGetStudentsMutation} from "../../../store/api/resumeApi.js";
import {useAddPortfolioUserMutation} from "../../../store/api/userApi.js";

export const ShortResume = ( ) => {
    const resumes = useSelector((state) => state.resumeState)
    const [currentResume, setCurrentResume] = useState(null)
    const { studentId } = useParams()
    const [isPdfGenerated, setPdfGenerated] = useState(false)
    const [getStudents, { error }] = useGetStudentsMutation()
    const [createOffer, { error2 }] = useCreateOfferMutation()
    const [isSended, setIsSended] = useState(false)

    useEffect(() => {
        setCurrentResume(resumes.students.find(el => el.id === +studentId))
    }, [resumes, studentId])

    useEffect(() => {
        getStudents()
    }, [])

    const sendOffer = async () => {
        console.log(studentId)
        console.log(currentResume)
        await createOffer({
            studentId: +studentId,
            type: 0
        }).then(res => {
            if (res.data) setIsSended(true)
        })
    }

    return (
        <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.padding_5050, globalStyles.center)}>
            {/*<Button onClick={generatePdf} disabled={isPdfGenerated}>*/}
            {/*    {isPdfGenerated ?*/}
            {/*        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*            <g id="vuesax/linear/tick-circle">*/}
            {/*                <g id="tick-circle">*/}
            {/*                    <path id="Vector"*/}
            {/*                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"*/}
            {/*                          stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"*/}
            {/*                          strokeLinejoin="round"/>*/}
            {/*                    <path id="Vector_2" d="M7.75 11.9999L10.58 14.8299L16.25 9.16992" stroke="#FFFFFF"*/}
            {/*                          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>*/}
            {/*                </g>*/}
            {/*            </g>*/}
            {/*        </svg>*/}
            {/*        :*/}
            {/*        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">*/}
            {/*            <path d="M6 20L18 20" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"*/}
            {/*                  strokeLinejoin="round"/>*/}
            {/*            <path d="M12 4V16M12 16L15.5 12.5M12 16L8.5 12.5" stroke="#FFFFFF" strokeWidth="1.5"*/}
            {/*                  strokeLinecap="round" strokeLinejoin="round"/>*/}
            {/*        </svg>}*/}
            {/*    {isPdfGenerated ? 'PDF Сохранен' : 'Сохранить в PDF'}*/}
            {/*</Button>*/}
            <Tile props={{
                classNames: cn(globalStyles.start),
            }}>
                <FlexLayout className={cn(globalStyles.padding_0, globalStyles.between)}>
                    <Link to={'/students/'} className={cn(globalStyles.with_icon, globalStyles.text_decor_none, globalStyles.bold_text, globalStyles.secondary)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="vuesax/outline/arrow-left">
                                <g id="arrow-left">
                                    <path id="Vector" d="M9.56994 18.8201C9.37994 18.8201 9.18994 18.7501 9.03994 18.6001L2.96994 12.5301C2.67994 12.2401 2.67994 11.7601 2.96994 11.4701L9.03994 5.40012C9.32994 5.11012 9.80994 5.11012 10.0999 5.40012C10.3899 5.69012 10.3899 6.17012 10.0999 6.46012L4.55994 12.0001L10.0999 17.5401C10.3899 17.8301 10.3899 18.3101 10.0999 18.6001C9.95994 18.7501 9.75994 18.8201 9.56994 18.8201Z" fill="#292D32"/>
                                    <path id="Vector_2" d="M20.4999 12.75H3.66992C3.25992 12.75 2.91992 12.41 2.91992 12C2.91992 11.59 3.25992 11.25 3.66992 11.25H20.4999C20.9099 11.25 21.2499 11.59 21.2499 12C21.2499 12.41 20.9099 12.75 20.4999 12.75Z" fill="#292D32"/>
                                </g>
                            </g>
                        </svg>

                        Назад
                    </Link>

                    <Button buttonProps={{
                        classNames: globalStyles.width_50
                    }} onClick={sendOffer} disabled={isSended} isShort
                    >
                        {isSended ?
                            "Приглашение отправлено"
                        :
                            "Отправить приглашение"
                        }
                    </Button>
                </FlexLayout>

            </Tile>

            <Tile props={{
                classNames: cn(globalStyles.start, globalStyles.padding_0),
            }}>
                <div className={styles.container}>
                    <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.start, globalStyles.padding_0)}>
                        <FlexLayout className={cn(globalStyles.start, globalStyles.padding_0)}>
                            <picture>
                                <img width={150} height={150} src={Avatar}/>
                            </picture>

                            <FlexLayout type={LAYOUT_TYPES.VERTICAL}
                                        className={cn(globalStyles.start, globalStyles.padding_0, globalStyles.gap02)}>
                                <Typography variant="h2"
                                            noMargin>{currentResume?.lastName} {currentResume?.firstName} {currentResume?.patronymic}</Typography>
                                <Typography variant="h4" noMargin>{currentResume?.speciality}</Typography>
                                <br/>
                                <Typography variant="h5" noMargin>Желаемый доход: {currentResume?.salary}</Typography>
                                <Typography variant="p" noMargin><strong>День рождения:</strong> {currentResume?.birthday}</Typography>
                                <Typography variant="p" noMargin><strong>Личный сайт:</strong> {currentResume?.website}</Typography>
                                <Typography variant="p" noMargin><strong>Занятость:</strong> {currentResume?.employment}</Typography>
                                <Typography variant="p" noMargin><strong>Город:</strong> {currentResume?.city}</Typography>
                                <Typography variant="p" noMargin><strong>Средний балл:</strong> {currentResume?.avgMark}</Typography>
                            </FlexLayout>
                        </FlexLayout>

                        <Typography variant="h3" noMargin><strong>Контакты: </strong></Typography>
                        <div>
                            <Typography variant="p" noMargin><strong>email: </strong>{currentResume?.email}</Typography>
                            <Typography variant="p" noMargin><strong>tg: </strong>@{currentResume?.telegram}</Typography>
                        </div>

                        <Typography variant="h3" noMargin><strong>Опыт работы: </strong></Typography>
                        <FlexLayout type={LAYOUT_TYPES.VERTICAL}
                                    className={cn(globalStyles.start, globalStyles.padding_0)}>
                            {currentResume?.works && currentResume?.works.map(edu =>
                                <FlexLayout className={cn(globalStyles.start, globalStyles.padding_0)}>
                                    <FlexLayout type={LAYOUT_TYPES.VERTICAL}
                                                className={cn(globalStyles.start, globalStyles.padding_0)}>
                                        <div className={styles.row}>
                                            <h5 className={globalStyles.margin_block_0}>Название</h5>
                                            <p className={globalStyles.margin_block_0}>{edu?.name}</p>
                                        </div>

                                        {edu?.specialization &&
                                            <div className={styles.row}>
                                                <h5 className={globalStyles.margin_block_0}>Обязанности</h5>
                                                <p className={globalStyles.margin_block_0}>{edu?.specialization}</p>
                                            </div>
                                        }
                                    </FlexLayout>
                                    <FlexLayout type={LAYOUT_TYPES.VERTICAL}
                                                className={cn(globalStyles.start, globalStyles.padding_0)}>
                                        {edu?.start &&
                                            <div className={styles.row}>
                                                <h5 className={globalStyles.margin_block_0}>Период работы</h5>
                                                <p className={globalStyles.margin_block_0}>{edu?.start} - {edu?.end || "Настоящее время"}</p>
                                            </div>
                                        }
                                    </FlexLayout>
                                </FlexLayout>
                            )}
                        </FlexLayout>

                        <Typography variant="h3" noMargin>Образование: </Typography>
                        <FlexLayout type={LAYOUT_TYPES.VERTICAL}
                                    className={cn(globalStyles.start, globalStyles.padding_0)}>
                            {currentResume?.educations && currentResume?.educations.map(edu =>
                                <FlexLayout className={cn(globalStyles.start, globalStyles.padding_0)}>
                                    <FlexLayout type={LAYOUT_TYPES.VERTICAL}
                                                className={cn(globalStyles.start, globalStyles.padding_0)}>
                                        <div className={styles.row}>
                                            <h5 className={globalStyles.margin_block_0}>Образовательное учреждение</h5>
                                            <p className={globalStyles.margin_block_0}>{edu?.name}</p>
                                        </div>

                                        {edu?.specialization &&
                                            <div className={styles.row}>
                                                <h5 className={globalStyles.margin_block_0}>Направление обучения</h5>
                                                <p className={globalStyles.margin_block_0}>{edu?.specialization}</p>
                                            </div>
                                        }
                                    </FlexLayout>
                                    <FlexLayout type={LAYOUT_TYPES.VERTICAL}
                                                className={cn(globalStyles.start, globalStyles.padding_0)}>
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
                                </FlexLayout>
                            )}
                        </FlexLayout>
                        {/*<Typography variant="h3" noMargin>Курсы, тренинги: </Typography>*/}
                        <Typography variant="h3" noMargin>Навыки: </Typography>
                        <div>
                            {currentResume?.skills}
                        </div>

                        <Typography variant="h3" noMargin>Интересы: </Typography>
                        <div>
                            {currentResume?.interests}
                        </div>

                        <Typography variant="h3" noMargin>Цифровой портрет: </Typography>

                        <FlexLayout>
                            <RadarChart student={currentResume}/>
                        </FlexLayout>
                    </FlexLayout>
                </div>
            </Tile>
        </FlexLayout>
    )
}

export default ShortResume