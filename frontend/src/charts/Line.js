import React, { useEffect, useState } from "react";
import { Line, Bar } from 'react-chartjs-2';
import moment from "moment";
import { ButtonGroup, Button } from 'react-bootstrap/';

const LinePlot = (props) => {
    const { timeData, label } = props;

    const [value, setValue] = useState([1, 3]);
    const [chartData, setChartData] = useState(timeData);
    const [rawData, setRawData] = useState(timeData);


    const labels = Object.keys(chartData).reverse();
    labels && console.log("labels", labels)
    const minTimeZone = labels[0]
    const maxTimeZone = labels[labels.length - 1]
    const values = Object.values(chartData).reverse();
    values && console.log("values", values)

    const handleDayFilter = (e) => {
        console.log(e.target.id)
        let weekendCount = []
        let weekdaysCount = []

        for (const [key, value] of Object.entries(rawData)) {
            const date = moment(key);
            if (date.day() === 6 || date.day() === 7) {
                var b = {}

                weekendCount.push({ [key]: value })
            }
            else {
                weekdaysCount.push({ [key]: value })
            }

        }
        console.log("weekedn", weekendCount, " weekdaysCount", weekdaysCount)
        if (e.target.id === "1") {
            console.log("val1")
            setChartData(weekdaysCount);
            console.log("chart data", chartData)
        }
        else if (e.target.id === "3") {
            console.log("val3")
            setChartData(weekendCount);
            
        }
        else {
            console.log("val2")
            setChartData(rawData);
        }

    }
    const data = {
        labels: labels,
        datasets: [
            {
                label: `All ${label} Counts`,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                data: values,
                // showLine: false
            }
        ]
    }
    const options = {
        elements: {
            line: {
                tension: 0 // disables bezier curves
            }
        },
        spanGaps: false,
        // showLines: false,
        scales: {
            x: [{
                title: "time",
                type: 'time',
                gridLines: {
                    lineWidth: 2
                },

                ticks: {
                    autoSkip: true,
                    min: minTimeZone,
                    max: maxTimeZone,
                },
                time: {
                    unit: "second",
                    unitStepSize: 1000,
                    displayFormats: {
                        millisecond: 'MMM DD',
                        second: 'MMM DD',
                        minute: 'MMM DD',
                        hour: 'MMM DD',
                        day: 'MMM DD',
                        week: 'MMM DD',
                        month: 'MMM DD',
                        quarter: 'MMM DD',
                        year: 'MMM DD',
                    }
                },

            }],
            animation: {
                duration: 0 // general animation time
            },
            hover: {
                animationDuration: 0 // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0,
            yAxes: [{
                ticks: {

                    stepSize: 1
                }
            }]
        },
    }
    return (
        <>
            <h2 style={{
                fontFamily: "verdana",
                color: "rgb(55, 0, 179)"
            }}>Line Graph </h2>


            <Line data={data} options={options} />


            <div>

                <ButtonGroup aria-label="Basic example" toggle={true} onClick={handleDayFilter}>
                    <Button id={1} variant="secondary">Left</Button>
                    <Button id={2} variant="secondary">Middle</Button>
                    <Button id={3} variant="secondary">Right</Button>
                </ButtonGroup>
            </div>

        </>
    )
}
export default LinePlot;