import React from 'react';
import { ResponsiveBar, Bar } from '@nivo/bar';

const data = [
    {
        "id": 1,
        "userId": 7,
        "lastName": "",
        "science": 100,
        "price": 50, // Добавьте цену для элемента с id 1
        "total": 450,
        sport: 0,
        study: 20,
        project: 0,
        avgMark: 0,
        community: 0,
        culture: 0
    },
    {
        "id": 2,
        "userId": 8,
        "lastName": "Денисов",
        "science": 150,
        "price": 75, // Добавьте цену для элемента с id 2
        "total": 220,
        sport: 10,
        study: 30,
        project: 0,
        avgMark: 0,
        community: 0,
        culture: 0
    },
    {
        "id": 3,
        "userId": 9,
        "lastName": "Степанов",
        "science": 448,
        "price": 224, // Добавьте цену для элемента с id 3
        "total": 750,
        sport: 30,
        study: 20,
        project: 0,
        avgMark: 0,
        community: 0,
        culture: 0
    }
];

// const BarChart = ({ data }) => {
const BarChart = () => {
    return (
        <div style={{ height: '400px', width: '400px' }}>
            <ResponsiveBar
                data={data}
                keys={['science']}
                indexBy="price"
                margin={{ top: 50, right: 130, bottom: 80, left: 60 }} // Увеличьте bottom для места под цену
                padding={0.3}
                colors={({ id, data }) => data[`${id}_color`]} // Используйте цвета, определенные для каждого столбца
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                }}
                enableGridY={false}
                enableLabel={false}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                    },
                ]}
            >
                {/* Добавьте Bar компонент с ценой под каждым столбцом */}
                <Bar
                    data={data.map(item => ({
                        ...item,
                        [`id_color`]: item.science > 200 ? 'red' : 'green', // Задайте цвет в зависимости от условия
                    }))}
                    keys={['price']}
                    indexBy="id"
                    margin={{ top: 0, right: 0, bottom: 60, left: 0 }}
                    padding={0.1}
                    colors={({ id, data }) => data[`${id}_color`]}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                    }}
                />
            </ResponsiveBar>
        </div>
    );
};

export default BarChart;
