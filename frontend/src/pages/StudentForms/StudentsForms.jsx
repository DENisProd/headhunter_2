import {FlexLayout, LAYOUT_TYPES} from "../../components/ui/Layout/FlexLayout/FlexLayout";
import {SidebarWithFilters} from "./SidebarWithFilters/SidebarWithFilters";
import {StudentCard} from "../../components/StudentCard/StudentCard";
import cn from "classnames";
import globalStyles from "../../styles/global.module.scss";
import {useGetStudentsMutation} from "../../store/api/resumeApi.js";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Tile from "../../components/ui/Tile/Tile.jsx";
import studentCardStyles from '../../components/StudentCard/student-card.module.scss'
import {sortByLastName, sortByTotal} from "../../store/slices/resumeSlice.js";
import BarChart from "../../components/BarChart/BarChart.jsx";

export const StudentsForms = () => {
    const [getStudents, { error }] = useGetStudentsMutation()
    const dispatch = useDispatch()
    const resumeState = useSelector((state) => state.resumeState)
    const [isSortByLastName, setSortByLastName] = useState(false)
    const [isSortByTotal, setSortByTotal] = useState(false)
    const [favorites, setFavorites] = useState([])

    const updateFavorites = () => {
        let favs = JSON.parse(localStorage.getItem('favorites'))
        if (Array.isArray(favs)) setFavorites(favs)
        else setFavorites(favs)
    }

    useEffect(() => {
        getStudents()
        updateFavorites()
    }, [])

    const _sortByLastName = () => {
        setSortByLastName(!isSortByLastName)
        dispatch(sortByLastName(isSortByLastName))
    }
    const _sortByTotal = () => {
        setSortByTotal(!isSortByTotal)
        dispatch(sortByTotal(isSortByTotal))
    }

    return (
        <FlexLayout className={cn(globalStyles.page, globalStyles.flex_container, globalStyles.padding_5050)}>
            <SidebarWithFilters/>
            <FlexLayout type={LAYOUT_TYPES.VERTICAL}>
                <Tile props={{
                    classNames: cn(globalStyles.center, globalStyles.between, globalStyles.flex_grow_0)
                }}>
                    <BarChart data={resumeState.filteredStudents}/>
                </Tile>
                <Tile props={{
                    classNames: cn(globalStyles.center, globalStyles.between, globalStyles.flex_grow_0)
                }}>
                    <div className={studentCardStyles.container}>
                        <div></div>
                        <div className={cn(globalStyles.start, globalStyles.bold_text, globalStyles.with_icon, globalStyles.secondary)}
                            onClick={_sortByLastName}
                        >
                            ФИО
                            {isSortByLastName ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.70711 10.7071C4.31658 11.0976 3.68342 11.0976 3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289L7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071C12.3166 11.0976 11.6834 11.0976 11.2929 10.7071L8 7.41421L4.70711 10.7071Z" fill="#9EA6BB"/>
                                </svg>
                            :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.29289 5.29289C3.68342 4.90237 4.31658 4.90237 4.70711 5.29289L8 8.58579L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L8.70711 10.7071C8.31658 11.0976 7.68342 11.0976 7.29289 10.7071L3.29289 6.70711C2.90237 6.31658 2.90237 5.68342 3.29289 5.29289Z" fill="#9EA6BB"/>
                                </svg>
                            }

                        </div>
                        <div className={cn(globalStyles.start, globalStyles.bold_text, globalStyles.with_icon, globalStyles.secondary)}
                            onClick={_sortByTotal}
                        >
                            Рейтинг
                            {isSortByTotal ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.70711 10.7071C4.31658 11.0976 3.68342 11.0976 3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289L7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071C12.3166 11.0976 11.6834 11.0976 11.2929 10.7071L8 7.41421L4.70711 10.7071Z" fill="#9EA6BB"/>
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.29289 5.29289C3.68342 4.90237 4.31658 4.90237 4.70711 5.29289L8 8.58579L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L8.70711 10.7071C8.31658 11.0976 7.68342 11.0976 7.29289 10.7071L3.29289 6.70711C2.90237 6.31658 2.90237 5.68342 3.29289 5.29289Z" fill="#9EA6BB"/>
                                </svg>
                            }
                        </div>
                        <div className={cn(globalStyles.start, globalStyles.bold_text, globalStyles.with_icon, globalStyles.secondary)}>
                            Навыки
                        </div>
                        <div></div>
                    </div>
                </Tile>

                {resumeState.filteredStudents.map(student =>
                    <StudentCard student={student} updateFavorites={updateFavorites} inFavorites={favorites?.some(item => item.id === student.id) || false}/>
                )}
            </FlexLayout>
        </FlexLayout>
    )
}