import React, {useEffect} from "react";
import { RadarChart } from "./RadarChart";

const student_data = [
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

const MultiRadarChart = ({ students }) => {

    useEffect(() => {
        let data = []

        student_data.map(st => {
            // data.push
        })
    }, [])

    return (
        <div>
            {/*{students.map((student) => (*/}
            {/*    <div key={student.id}>*/}
            {/*        <h3>{`Student ID: ${student.userId}`}</h3>*/}
            {/*        <RadarChart student={student} />*/}
            {/*        <hr />*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    );
};

export default MultiRadarChart;
