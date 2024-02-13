import Tile from "../../../components/ui/Tile/Tile.jsx";
import cn from "classnames";
import globalStyles from "../../../styles/global.module.scss";
import {FlexLayout, LAYOUT_TYPES} from "../../../components/ui/Layout/FlexLayout/FlexLayout.jsx";
import {Button} from "../../../components/ui/Button/Button.jsx";
import {PieChart} from "../PieChart/PieChart.jsx";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import styles from "../../Profile/Education/education.module.scss";
import {Typography} from "../../../components/ui/Typography/Typography";
import {Details} from "../../../components/ui/Details/Details.jsx";

export const StudentPortfolio = () => {
    const resumeState = useSelector((state) => state.resumeState)

    const [isFull, setIsFull] = useState(false)

    return (
        <>
            {isFull ?
                <>
                    {resumeState.eduPortfolio &&
                        <Tile props={{
                            classNames: cn(globalStyles.center, globalStyles.between, globalStyles.flex_grow_0)
                        }}>
                            <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.start)}>
                                <h3 className={cn(globalStyles.margin_block_0, globalStyles.with_icon)}>Достижения обучающегося</h3>
                                <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.padding_0, globalStyles.gap1)}>
                                        {Object.keys(resumeState.eduPortfolio).map(val =>
                                            <>
                                                <Details>
                                                    <summary>
                                                        <Typography variant="h4" noMargin>{val}
                                                            <svg className={'open'} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995" stroke="var(--text-color)" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </Typography>
                                                    </summary>
                                                    <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.padding_0, globalStyles.gap1, globalStyles.marginTop1)}>
                                                        {resumeState.eduPortfolio[val].map(el =>
                                                            <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(styles.list)}>
                                                                <div className={styles.row}>
                                                                    <h5 className={globalStyles.margin_block_0}>{el.category} | {el.typeName}</h5>
                                                                    <p className={globalStyles.margin_block_0}>{el?.name}</p>
                                                                </div>
                                                            </FlexLayout>
                                                        )}
                                                    </FlexLayout>
                                                </Details>
                                            </>
                                        )}
                                        <Button buttonProps={{
                                            style: {marginTop: "1rem"}
                                        }} isShort onClick={() => setIsFull(false)}
                                        >Скрыть</Button>
                                </FlexLayout>
                            </FlexLayout>
                        </Tile>
                    }
                </>
            :
                <>
                    {resumeState.eduPortfolio &&
                        <Tile props={{
                            classNames: cn(globalStyles.center, globalStyles.between, globalStyles.flex_grow_0)
                        }}>
                            <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.start)}>
                                <h3 className={cn(globalStyles.margin_block_0, globalStyles.with_icon)}>Достижения обучающегося</h3>
                                <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.padding_0)} isAdaptive>
                                    <div>
                                        {Object.keys(resumeState.eduPortfolio).map(item =>
                                            <div><b>{item}: </b>{resumeState.eduPortfolio[item].length}</div>
                                        )}
                                        <Button buttonProps={{
                                            style: {marginTop: "1rem"}
                                        }} isShort onClick={() => setIsFull(true)}
                                        >Посмотреть полностью</Button>
                                    </div>
                                    <PieChart portfolio={resumeState.eduPortfolio}/>
                                </FlexLayout>
                            </FlexLayout>
                        </Tile>
                    }
                </>
            }
        </>
    )
}