import styles from './custom-bar-chart.module.scss'
import {useEffect, useState} from "react";
import {BarColumn} from "./BarColumn.jsx";

export const CustomBarChart = ({ colorList, list, sortByField, displayField, onSelect }) => {

    const [maxValue, setMaxValue] = useState(0)
    const [values, setValues] = useState([])


    useEffect(() => {
        if (list) {
            let max = 0
            list.map(item => {
                if (item[sortByField] > max) max = item[sortByField]
            })
            setMaxValue(max)

            let tempValues = []
            for (let i = 0; i < max; i+=50) {
                tempValues.push(i)
            }
            setValues(tempValues.reverse())
        }
    }, [list])

    return (
        <div className={styles.main_container}>
            <div className={styles.values}>
                {values.map(val =>
                    <div>{val}</div>
                )}
            </div>
            <div className={styles.content}>
                {Array.isArray(list) && list.map((item, index) =>
                    <BarColumn height={item[sortByField] / maxValue}
                               color={colorList[index]}
                               onSelect={onSelect}
                               id={item.id}
                               text={item[displayField]} tooltipText={
                        <ul className={styles.ul}>
                            <li><b>Суммарный рейтинг: </b> {item.total}</li>
                            <li><b>Образовательная: </b> {item.study}</li>
                            <li><b>Спортивная: </b> {item.sport}</li>
                            <li><b>Научная: </b> {item.science}</li>
                            <li><b>Проектная: </b> {item.project}</li>
                            <li><b>Управленческая: </b> {item.study}</li>
                            <li><b>Культурная: </b> {item.culture}</li>
                            <li><b>Общественная: </b> {item.community}</li>
                            <li><b>Средний балл: </b> {item.avgMark}</li>
                        </ul>
                    }/>
                )}
            </div>
        </div>
    )
}