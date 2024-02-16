import {FlexLayout, LAYOUT_TYPES} from "../../../components/ui/Layout/FlexLayout/FlexLayout.jsx";
import globalStyles from "../../../styles/global.module.scss";
import Tile from "../../../components/ui/Tile/Tile.jsx";
import cn from "classnames";
import {CloseButton} from "../../../components/ui/Button/Close/CloseButton.jsx";
import {Button} from "../../../components/ui/Button/Button.jsx";
import ImageUploader from "../../../components/ui/ImageUploader/ImageUploader.jsx";
import styles from "../Portfolio/portfolio.module.scss";
import {PortfolioCard} from "../../../components/Portfolio/PortfolioCard.jsx";
import React, {useEffect, useState} from "react";
import {Typography} from "../../../components/ui/Typography/Typography";
import {useGetPortfolioMutation, useGetStudentWorksMutation} from "../../../store/api/userApi.js";
import {useDispatch, useSelector} from "react-redux";
import {WorkCreate} from "./WorkCreate.jsx";

export const WorkExperience = () => {
    const [isAdd, setIsAdd] = useState(false)

    const [getWorks, {error}] = useGetStudentWorksMutation()
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userState)

    useEffect(() => {
        getWorks()
    }, [])

    const closeAdding = () => {
        setIsAdd(false)
        getWorks()
    }

    return (
        <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={globalStyles.padding_0}>
            <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={globalStyles.padding_0}>
                <Tile>
                    <FlexLayout className={globalStyles.padding_0}>
                        {isAdd ?
                            <div className={cn(globalStyles.between, globalStyles.flex)}>
                                <h3 className={cn(globalStyles.start, globalStyles.margin_block_02)}>Добавление нового
                                    достижения</h3>
                                <CloseButton onClick={() => setIsAdd(false)}/>
                            </div>
                            :
                            <>
                                <Button isShort onClick={() => setIsAdd(true)}>+ Добавить</Button>
                            </>
                        }
                    </FlexLayout>
                </Tile>

                {isAdd && <WorkCreate setIsAdd={setIsAdd} closeAdding={closeAdding} getProfile={getWorks}/>}

                <Tile props={{
                    classNames: cn(globalStyles.start)
                }}>
                    <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={styles.main_tile}>
                        <h3 className={cn(globalStyles.margin_block_0, globalStyles.with_icon)}>Опыт работы</h3>

                        {userState.works.length > 0 ?
                            <>
                                {userState.works.map(doc =>
                                    <div className={cn(globalStyles.flex, styles.card)}>
                                        <div>
                                            <p>Наименование:</p>
                                            <p>{doc?.name}</p>
                                        </div>
                                        <div>
                                            <p>
                                                Обязанности:
                                            </p>
                                            <p>
                                                {doc?.specialization}
                                            </p>
                                        </div>
                                        <div>
                                            <p>Период:</p>
                                            {doc?.start} - {doc?.end || "Наст. время"}
                                        </div>
                                    </div>
                                )}
                            </>
                            :
                            <div>
                                Вы ещё не добавили портфолио
                            </div>
                        }
                    </FlexLayout>
                </Tile>
            </FlexLayout>
        </FlexLayout>
    )
}