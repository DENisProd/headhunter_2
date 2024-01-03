import React, {useEffect, useState} from "react";
import {ResponsiveRadar} from '@nivo/radar'
import {useSelector} from "react-redux";
import {FlexLayout} from "../ui/Layout/FlexLayout/FlexLayout";

export const RadarChart = ({ student }) => {

    const [data, setData] = useState([])

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

    return (
        <FlexLayout center minHeight>
            <div style={{ minWidth: 300, height: 300 }}>
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
                />
            </div>
        </FlexLayout>
    )
}