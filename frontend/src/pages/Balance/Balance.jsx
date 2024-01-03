import {FlexLayout, LAYOUT_TYPES} from "../../components/ui/Layout/FlexLayout/FlexLayout";
import Tile from "../../components/ui/Tile/Tile.jsx";
import globalStyles from "../../styles/global.module.scss";
import cn from "classnames";
import {Button} from "../../components/ui/Button/Button";
import styles from './balance.module.scss'
import {TextField} from "../../components/ui/TextInput/TextField";
import {useForm} from "react-hook-form";
import {Typography} from "../../components/ui/Typography/Typography";

export const Balance = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    return (
        <FlexLayout type={LAYOUT_TYPES.VERTICAL} className={cn(globalStyles.page, globalStyles.padding_5050)}>
            <Typography variant="h2" noMargin>Тарифы</Typography>
            <Typography variant="p" noMargin>Тестовые тарифы</Typography>

            <div>
                <form>

                        <p>
                            Сумма пополнения
                            <FlexLayout>
                                <TextField/>
                                <Button buttonProps={{
                                    classNames: globalStyles.width_30
                                }}>Пополнить</Button>
                            </FlexLayout>
                        </p>
                </form>
            </div>
            <FlexLayout>
                <Tile props={{
                    classNames: globalStyles.width_30
                }}>
                    <FlexLayout type={LAYOUT_TYPES.VERTICAL}
                                className={cn(globalStyles.padding_0, globalStyles.center)}>
                        <h2 className={cn(globalStyles.margin_block_0, globalStyles.center)}>Месяц</h2>

                        <h3 className={styles.money}>500 ₽</h3>

                        <div>Получите доступ к нашему уникальному сервису</div>

                        <Button>Оформить</Button>
                    </FlexLayout>
                </Tile>

                <Tile props={{
                    classNames: globalStyles.width_30
                }}>
                    <FlexLayout type={LAYOUT_TYPES.VERTICAL}
                                className={cn(globalStyles.padding_0, globalStyles.center)}>
                        <h2 className={cn(globalStyles.margin_block_0, globalStyles.center)}>3 месяца</h2>

                        <h3 className={styles.money}>1350 ₽</h3>

                        <div>Выгода 10%</div>

                        <Button>Оформить</Button>
                    </FlexLayout>
                </Tile>

                <Tile props={{
                    classNames: globalStyles.width_30
                }}>
                    <FlexLayout type={LAYOUT_TYPES.VERTICAL}
                                className={cn(globalStyles.padding_0, globalStyles.center)}>
                        <h2 className={cn(globalStyles.margin_block_0, globalStyles.center)}>12 месяцев</h2>

                        <h3 className={styles.money}>5000 ₽</h3>

                        <div>Выгода 17%</div>

                        <Button>Оформить</Button>
                    </FlexLayout>
                </Tile>
            </FlexLayout>
        </FlexLayout>
    )
}