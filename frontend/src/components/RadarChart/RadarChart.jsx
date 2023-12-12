import React, {useEffect, useState} from "react";
import {ResponsiveRadar} from '@nivo/radar'
import {useSelector} from "react-redux";
import {FlexLayout} from "../ui/Layout/FlexLayout/FlexLayout";

export const RadarChart = () => {
    const user = useSelector(state => state.userState)

    const [data, setData] = useState([])

    useEffect(() => {
        if (!user?.profile) return
        const {
            science,
            study,
            community,
            culture,
            project,
            sport
        } = user.profile
        console.log(science)
        const _data = [
            {
                category: "Спортивная",
                value: sport
            },
            {
                category: "Учебная и проектная",
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
                category: "Культурно-творческая",
                value: culture
            },
            {
                category: "Учебная",
                value: study
            }
        ]

        setData(_data)
    }, [user])

    return (
        <FlexLayout center minHeight>
            <div style={{ width: 600, height: 350 }}>
                <ResponsiveRadar
                    animate
                    curve="linearClosed"
                    data={data}
                    height={350}
                    indexBy="category"
                    keys={[
                        "value",
                    ]}
                    width={600}
                    margin={{
                        top: 25,
                        bottom: 25
                    }}
                />
            </div>
        </FlexLayout>
    )
}