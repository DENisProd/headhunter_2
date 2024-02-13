import {FlexLayout, LAYOUT_TYPES} from "../../../components/ui/Layout/FlexLayout/FlexLayout.jsx";
import globalStyles from "../../../styles/global.module.scss";
import Tile from "../../../components/ui/Tile/Tile.jsx";
import cn from "classnames";
import {CloseButton} from "../../../components/ui/Button/Close/CloseButton.jsx";
import {Button} from "../../../components/ui/Button/Button.jsx";
import ImageUploader from "../../../components/ui/ImageUploader/ImageUploader.jsx";
import styles from "../Portfolio/portfolio.module.scss";
import {PortfolioCard} from "../../../components/Portfolio/PortfolioCard.jsx";
import React from "react";
import {Typography} from "../../../components/ui/Typography/Typography";

export const WorkExperience = () => {
    return (
        <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={globalStyles.padding_0}>
            <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={globalStyles.padding_0}>
                <Tile>
                    <FlexLayout className={globalStyles.padding_0}>
                            <div className={cn(globalStyles.between, globalStyles.flex)}>
                                <Typography variant="h4" noMargin>Добавление опыта работы</Typography>

                                <Button isShort>+ Добавить</Button>
                            </div>
                    </FlexLayout>
                </Tile>

                {/*<Tile props={{*/}
                {/*    classNames: cn(globalStyles.start)*/}
                {/*}}>*/}
                {/*    <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={styles.main_tile}>*/}
                {/*        <h3 className={cn(globalStyles.margin_block_0, globalStyles.with_icon)}>Портфолио</h3>*/}
                {/*    </FlexLayout>*/}
                {/*</Tile>*/}
            </FlexLayout>
        </FlexLayout>
    )
}