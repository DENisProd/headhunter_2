import Tile from "../../../components/ui/Tile/Tile.jsx";
import globalStyles from "../../../styles/global.module.scss";
import ImageUploader from "../../../components/ui/ImageUploader/ImageUploader.jsx";
import React, {useEffect, useState} from "react";
import {FlexLayout, LAYOUT_TYPES} from "../../../components/ui/Layout/FlexLayout/FlexLayout";
import cn from "classnames";
import styles from './portfolio.module.scss'
import {CloseButton} from "../../../components/ui/Button/Close/CloseButton.jsx";
import {Button} from "../../../components/ui/Button/Button";
import {useGetPortfolioMutation} from "../../../store/api/userApi.js";
import {useDispatch, useSelector} from "react-redux";
import fileIcon from '../../../assets/document_icon.svg';

export const Portfolio = () => {
    const [files, setFiles] = useState([])
    const [isAdd, setIsAdd] = useState(false)

    const [getPortfolio, {error}] = useGetPortfolioMutation()
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userState)

    useEffect(() => {
        getPortfolio()
    }, [])

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
                                <Button isShort buttonProps={{
                                    onClick: () => setIsAdd(true)
                                }}>+ Добавить</Button>
                            </>
                        }
                    </FlexLayout>
                </Tile>

                {isAdd && <ImageUploader setParentImages={setFiles} setIsAdd={setIsAdd}/>}
                <Tile props={{
                    classNames: cn(globalStyles.start)
                }}>
                    <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={styles.main_tile}>
                        <h3 className={cn(globalStyles.margin_block_0, globalStyles.with_icon)}>Портфолио</h3>

                        {userState.portfolio.length > 0 ?
                            <>
                                {userState.portfolio.map(doc =>
                                    <div className={styles.tile}>
                                        <img
                                            src={doc?.portfolioFile[0].mimeType.includes("image") ? doc?.portfolioFile[0].url : fileIcon}/>
                                        <div className={styles.text}>{doc.name}</div>
                                        <div className={styles.buttons}>
                                            <button>
                                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20.2666 17.7331L30.6533 7.34642" stroke="#80889D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M31.6669 12.4133V6.33333H25.5869" stroke="#80889D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M17.7335 6.33333H15.2002C8.86683 6.33333 6.3335 8.86667 6.3335 15.2V22.8C6.3335 29.1333 8.86683 31.6667 15.2002 31.6667H22.8002C29.1335 31.6667 31.6668 29.1333 31.6668 22.8V20.2667" stroke="#80889D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>

                                            </button>

                                            <button>
                                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <g id="icon / download">
                                                        <path id="Vector" d="M9.5 31.666L28.5 31.666" stroke="#80889D"
                                                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path id="Vector_2"
                                                              d="M19.0002 6.33398V25.334M19.0002 25.334L24.5418 19.7923M19.0002 25.334L13.4585 19.7923"
                                                              stroke="#80889D" strokeWidth="1.5" strokeLinecap="round"
                                                              strokeLinejoin="round"/>
                                                    </g>
                                                </svg>
                                            </button>
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