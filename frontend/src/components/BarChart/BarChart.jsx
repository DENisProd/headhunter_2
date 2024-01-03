import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const data = [
    {
        "id": 1,
        "userId": 7,
        "lastName": "",
        // ... (остальные свойства)
        "science": 100,
    },
    {
        "id": 2,
        "userId": 8,
        "lastName": "Денисов",
        // ... (остальные свойства)
        "science": 150,
    },
    {
        "id": 3,
        "userId": 9,
        "lastName": "Степанов",
        // ... (остальные свойства)
        "science": 448,
    }
];

// const BarChart = ({ data }) => {
const BarChart = () => {
    return (
        <div style={{ height: '400px', width: '400px' }}>
            <ResponsiveBar
                data={data}
                keys={['science']}
                indexBy="id"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'nivo' }}
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
            />
        </div>
    );
};

export default BarChart;