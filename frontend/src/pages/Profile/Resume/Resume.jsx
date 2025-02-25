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
import React, {useRef, useState} from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const Resume = () => {
    const user = useSelector((state) => state.userState)

    const contentDivRef = useRef(null);
    const [isPdfGenerated, setPdfGenerated] = useState(false)

    const generatePdf = async () => {
        if (contentDivRef.current) {
            const canvas = await html2canvas(contentDivRef.current);

            // Создаем новый документ PDF
            const pdf = new jsPDF({
                unit: 'px',
                format: 'a4',
            });

            // Вычисляем пропорции для отображения изображения на всю страницу
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const aspectRatio = canvas.width / canvas.height;
            const imageWidth = pdfWidth;
            const imageHeight = pdfWidth / aspectRatio;

            // Добавляем изображение в PDF, занимая всю страницу
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imageWidth, imageHeight);

            // Сохраняем PDF
            pdf.save('resume.pdf');

            // Устанавливаем статус генерации PDF
            setPdfGenerated(true);
        }
    };


    return (
        <FlexLayout type={LAYOUT_TYPES.VERTICAL} noPadding>
            <Tile>
                <FlexLayout className={globalStyles.padding_0}>
                    <div className={cn(globalStyles.between, globalStyles.flex)}>
                        <Typography variant="h4" noMargin>Добавление опыта работы</Typography>

                        <Button isShort onClick={generatePdf} disabled={isPdfGenerated}>
                            {isPdfGenerated ?
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="vuesax/linear/tick-circle">
                                        <g id="tick-circle">
                                            <path id="Vector"
                                                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                                  stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                            <path id="Vector_2" d="M7.75 11.9999L10.58 14.8299L16.25 9.16992" stroke="#FFFFFF"
                                                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </g>
                                    </g>
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 20L18 20" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                    <path d="M12 4V16M12 16L15.5 12.5M12 16L8.5 12.5" stroke="#FFFFFF" strokeWidth="1.5"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>}
                            {isPdfGenerated ? 'PDF Сохранен' : 'Сохранить в PDF'}
                        </Button>
                    </div>
                </FlexLayout>
            </Tile>

            <div className={styles.resume_label}>Предпросмотр резюме доступен только с ноутбука</div>

            <Tile props={{
                classNames: cn(globalStyles.start, globalStyles.padding_0),
            }}>
                <div className={cn(styles.container, styles.resume)} ref={contentDivRef}>
                    <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.start, globalStyles.padding_0, styles.resume)}>
                        <FlexLayout className={cn(globalStyles.start, globalStyles.padding_0)}>
                            <picture>
                                <img width={250} height={250} src={user?.user?.avatar || Avatar}/>
                            </picture>
                            <FlexLayout type={LAYOUT_TYPES.VERTICAL}
                                        className={cn(globalStyles.start, globalStyles.padding_0, globalStyles.gap02)}>
                                <Typography variant="h2"
                                            noMargin>{user?.profile?.lastName} {user?.profile?.firstName} {user?.profile?.patronymic}</Typography>
                                <Typography variant="h4" noMargin>{user?.profile?.speciality}</Typography>
                                <br/>
                                <Typography variant="h5" noMargin>Желаемый доход: {user?.profile?.salary}</Typography>
                                <Typography variant="p" noMargin><strong>День рождения:</strong> {user?.profile?.birthday}</Typography>
                                <Typography variant="p" noMargin><strong>Личный сайт:</strong> {user?.profile?.website}</Typography>
                                <Typography variant="p" noMargin><strong>Занятость:</strong> {user?.profile?.employment}</Typography>
                                <Typography variant="p" noMargin><strong>Город:</strong> {user?.profile?.city}</Typography>
                                <Typography variant="p" noMargin><strong>Средний балл:</strong> {user?.profile?.avgMark}</Typography>
                            </FlexLayout>
                        </FlexLayout>

                        <Typography variant="h3" noMargin><strong>Контакты: </strong></Typography>
                        <div>
                            <Typography variant="p" noMargin><strong>email: </strong>{user?.user?.email}</Typography>
                            <Typography variant="p" noMargin><strong>tg: </strong>@{user?.user?.telegram}</Typography>
                        </div>

                        <Typography variant="h3" noMargin><strong>Опыт работы: </strong></Typography>
                        <FlexLayout type={LAYOUT_TYPES.VERTICAL}
                                    className={cn(globalStyles.start, globalStyles.padding_0)}>
                            {user?.profile?.works && user?.profile?.works.map(edu =>
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
                            {user?.profile?.educations && user?.profile?.educations.map(edu =>
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
                            {user?.profile?.skills}
                        </div>

                        <Typography variant="h3" noMargin>Интересы: </Typography>
                        <div>
                            {user?.profile?.interests}
                        </div>

                        <Typography variant="h3" noMargin>Ключевые слова публикаций: </Typography>
                        <div>
                            Микропроцессорная, интернет вещей, IoT,Веб-приложение, информационная безопасность, система контроля, безопасность помещений, умный дом, ESP8266, микропроцессорная система, информационная безопасность, искусственный интеллект, Сети Петри, Маркировка, Моделирование
                        </div>

                        <Typography variant="h3" noMargin>Цифровой портрет: </Typography>

                        <FlexLayout>
                            <RadarChart student={user?.profile}/>
                        </FlexLayout>
                    </FlexLayout>
                </div>
            </Tile>
        </FlexLayout>
    )
}

export default Resume