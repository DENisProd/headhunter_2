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
import {PortfolioCard} from "../../../components/Portfolio/PortfolioCard";

export const Portfolio = () => {
    const [files, setFiles] = useState([])
    const [isAdd, setIsAdd] = useState(false)

    const [getPortfolio, {error}] = useGetPortfolioMutation()
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userState)

    useEffect(() => {
        getPortfolio()
    }, [])

    const closeAdding = () => {
        setIsAdd(false)
        getPortfolio()
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

                {isAdd && <ImageUploader setParentImages={setFiles} setIsAdd={setIsAdd} closeAdding={closeAdding}/>}
                <Tile props={{
                    classNames: cn(globalStyles.start)
                }}>
                    <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={styles.main_tile}>
                        <h3 className={cn(globalStyles.margin_block_0, globalStyles.with_icon)}>Портфолио</h3>

                        {userState.portfolio.length > 0 ?
                            <>
                                {userState.portfolio.map(doc =>
                                    <PortfolioCard data={doc} />
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