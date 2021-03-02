
import React, { useState } from "react";


import LineChart from './LineChart';


const ApexLineChart = (props) => {
    const { timeData, label, paginationStart, paginationStop } = props;
  
    
    const [state, setState] = useState(timeData)
    const series = [{
        name: "Count",
        data: timeData
    }]
    const options = {
        legend: {
            show: true
        },
        dataLabels: {
            enabled: false,
        },
        title: {
            text: `${label} Object of interest count from ${paginationStart} to ${paginationStop}`,
            align: 'center'
        },
        chart: {

           
            zoom: {
                enabled: true
            },
            animations: {
                enabled: true
            },

            xaxis: {
                type: "datetime",
            },
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true | '<img src="/static/icons/reset.png" width="20">',
                    customIcons: []
                },
                export: {
                    csv: {
                        filename: undefined,
                        columnDelimiter: ',',
                        headerCategory: 'category',
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: undefined,
                    },
                    png: {
                        filename: undefined,
                    }
                },
                autoSelected: 'zoom'
            },

        },
    }


    return (
        <>
            <div id="chart" style={{ height: "inherit", magrin: "40px", overflow: "auto" }}>
                <LineChart  options={options} series={series}/>

            </div>

        </>
    )
}
export default ApexLineChart;