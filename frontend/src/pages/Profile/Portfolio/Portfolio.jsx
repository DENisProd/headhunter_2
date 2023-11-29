import Tile from "../../../components/ui/Tile/Tile.jsx";
import globalStyles from "../../../styles/global.module.scss";
import ImageUploader from "../../../components/ui/ImageUploader/ImageUploader.jsx";
import React, {useEffect, useState} from "react";
import {FlexLayout, LAYOUT_TYPES} from "../../../components/ui/Layout/FlexLayout/FlexLayout";
import cn from "classnames";
import {CloseButton} from "../../../components/ui/Button/Close/CloseButton.jsx";
import {Button} from "../../../components/ui/Button/Button";
import {useGetPortfolioMutation} from "../../../store/api/userApi.js";
import {useDispatch, useSelector} from "react-redux";

export const Portfolio = () => {
    const [files, setFiles] = useState([])
    const [isAdd, setIsAdd] = useState(false)

    const [getPortfolio, { error }] = useGetPortfolioMutation()
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userState)

    useEffect(() => {
        getPortfolio()
    }, [])

    return (
        <FlexLayout type={LAYOUT_TYPES.VERTICAL}>
            <FlexLayout type={LAYOUT_TYPES.VERTICAL}>
                <Tile>
                    <FlexLayout>
                        {isAdd ?
                            <>
                                <h3 className={cn(globalStyles.start, globalStyles.margin_block_02)}>Добавление нового достижения</h3>
                                <CloseButton onClick={() => setIsAdd(false)}/>
                            </>
                        :
                            <>
                                <Button buttonProps={{
                                    onClick: () => setIsAdd(true)
                                }}>+ Добавить</Button>
                            </>
                        }
                    </FlexLayout>
                </Tile>

                {isAdd && <ImageUploader setParentImages={setFiles} setIsAdd={setIsAdd}/>}
                <Tile props={{
                    classNames: globalStyles.start
                }}>
                    {userState.portfolio.map(doc =>
                        <div>
                            {doc.name}
                            <img style={{
                                width: '6rem',
                                height: '6rem'
                            }} src={doc?.portfolioFile[0].url}/>
                        </div>
                    )}
                </Tile>
            </FlexLayout>
        </FlexLayout>
    )
}