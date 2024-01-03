import cn from "classnames";
import globalStyles from "../../../styles/global.module.scss";
import Tile from "../../../components/ui/Tile/Tile.jsx";
import {Typography} from "../../../components/ui/Typography/Typography.jsx";
import {FlexLayout, LAYOUT_TYPES} from "../../../components/ui/Layout/FlexLayout/FlexLayout";
import styles from './sidebar-with-filters.module.scss'
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setFilterRating, sortByLastName} from "../../../store/slices/resumeSlice.js";

export const SidebarWithFilters = () => {
    const [ratingFilters, setRatingFilters] = useState({
        total: 0,
        science: 0,
        study: 0,
        community: 0,
        culture: 0,
        project: 0,
        sport: 0
    })
    const [isExtendedRating, setIsExtendedRating] = useState(false)

    const dispatch = useDispatch()

    const toggleExtendedRating = () => {
        setIsExtendedRating(!isExtendedRating)
    }

    const handler = (event) => {
        setRatingFilters(state => ({
            ...state,
            [event.target.name]: +event.target.value
        }))
    }

    useEffect(() => {
        dispatch(setFilterRating(ratingFilters))
    }, [ratingFilters])

    return (
        <aside className={cn(globalStyles.center, globalStyles.width_30, globalStyles.padding_1000)}>
            <Tile>
                <Typography variant={"h3"} noMargin>Фильтры</Typography>

                <div className={styles.filters_container}>
                    <p>
                        <div>Мин. общий рейтинг: {ratingFilters.total}</div>
                        <input value={ratingFilters.total} onChange={handler} name="total" type="range" min={0} max="50" step={1} />
                    </p>

                    <div>
                        Расширенный рейтинг
                        <input checked={isExtendedRating} onChange={toggleExtendedRating} type="checkbox" />
                    </div>

                    {isExtendedRating &&
                        <div>
                            <p>
                                <div>Мин. спортивная: {ratingFilters.sport}</div>
                                <input value={ratingFilters.sport} onChange={handler} name="sport" type="range" min={0} max="10" step={1} />
                            </p>
                            <p>
                                <div>Мин. проектная: {ratingFilters.project}</div>
                                <input value={ratingFilters.project} onChange={handler} name="project" type="range" min={0} max="10" step={1}/>
                            </p>
                            <p>
                                <div>Мин. общественная: {ratingFilters.community}</div>
                                <input value={ratingFilters.community} onChange={handler} name="community" type="range" min={0} max="10" step={1}/>
                            </p>
                            <p>
                                <div>Мин. наука: {ratingFilters.science}</div>
                                <input value={ratingFilters.science} onChange={handler} name="science" type="range" min={0} max="10" step={1} />
                            </p>
                            <p>
                                <div>Мин. учебная: {ratingFilters.study}</div>
                                <input value={ratingFilters.study} onChange={handler} name="study" type="range" min={0} max="10" step={1} />
                            </p>
                            <p>
                                <div>Мин. творческая: {ratingFilters.culture}</div>
                                <input value={ratingFilters.culture} onChange={handler} name="culture" type="range" min={0} max="10" step={1} />
                            </p>
                        </div>
                    }
                </div>
            </Tile>
        </aside>
    )
}