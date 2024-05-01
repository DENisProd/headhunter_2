import React, {useEffect, useState} from "react";
import {ResponsiveRadar} from '@nivo/radar'
import {useSelector} from "react-redux";
import {FlexLayout} from "../ui/Layout/FlexLayout/FlexLayout";

import styles from "./radar-chart.module.scss"

export const RadarChart = ({ student, chartColor = '--primary-color' }) => {

    const [data, setData] = useState([])
    const style = getComputedStyle(document.body)

    useEffect(() => {
        if (!student) return
        const {
            science,
            study,
            community,
            culture,
            project,
            sport
        } = student
        const _data = [
            {
                category: "Спортивная",
                value: sport
            },
            {
                category: "Проектная",
                value: project
            },
            {
                category: "Общественная",
                value: community
            },
            {
                category: "Наука",
                value: science
            },
            {
                category: "Учебная",
                value: study
            },
            {
                category: "Творческая",
                value: culture
            },
        ]

        setData(_data)
    }, [student])

    // const style = {{
    //
    // }}

    return (
        <FlexLayout center minHeight>
            <div className={styles.chart}>
                <ResponsiveRadar
                    animate
                    curve="linearClosed"
                    data={data}
                    indexBy="category"
                    keys={[
                        "value",
                    ]}
                    margin={{
                        top: 25,
                        left: 80,
                        right: 80,
                        bottom: 25
                    }}
                    colors={() => style.getPropertyValue(chartColor)}
                    // colors={{ scheme: 'category10' }}
                    // borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                    // borderColor={`var(${chartColor})`} // Цвет границы секторов
                    // borderColor={{ from: 'color' }}
                    // fillOpacity={0.6} // Прозрачность секторов
                />
            </div>
        </FlexLayout>
    )
}