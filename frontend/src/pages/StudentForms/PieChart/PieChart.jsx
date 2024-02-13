import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ResponsivePie} from '@nivo/pie'
import styles from "../../../components/RadarChart/radar-chart.module.scss";
import {FlexLayout} from "../../../components/ui/Layout/FlexLayout/FlexLayout.jsx";
import cn from "classnames";


const colors = [
    '--text-link-color',
    '--text-blind-color',
    '--text-contrast-color',
    '--primary-color',
    '--primary-dark-color',
    '--primary-light-color',
    '--accent-color-yellow',
    '--accent-dark-color-yellow',
    '--accent-light-color-yellow',
    '--accent-color-red',
    '--accent-dark-color-red',
    '--accent-light-color-red',
]

export const PieChart = ({portfolio}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        let updatedData = []
        {
            Object.keys(portfolio).map((item, index) =>
                updatedData.push({
                    id: item.slice(0, 6) + "...",
                    value: portfolio[item].length,
                    color: `var(${colors[index]})`
                })
            )
        }
        setData(updatedData)
    }, [portfolio])

    return (
        <FlexLayout center minHeight noPadding>
            <div className={cn(styles.chart, styles.pie)}>
                {data &&
                    <ResponsivePie
                        activeOuterRadiusOffset={8}
                        animate
                        data={data}
                        legends={[]}
                        margin={{
                            bottom: 80,
                            left: 80,
                            right: 80,
                            top: 30
                        }}
                        theme={{
                            text: {
                                fontFamily: '\'SFMono-Regular\', Consolas, \'Liberation Mono\', Menlo, Courier, monospace'
                            }
                        }}
                    />
                }
            </div>
        </FlexLayout>
    )
}