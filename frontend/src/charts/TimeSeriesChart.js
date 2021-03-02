import React, { useEffect, useState } from "react";
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart
} from "react-timeseries-charts";

const TimeSeriesChart = (props) => {
    const { timeData } = props;
    // min "timestamp": "2021-02-24T10:03:47.000Z",
    // max "timestamp": "2021-02-23T10:45:19.587Z",
    const labels = Object.keys(timeData).reverse();
    const minTimeZone = labels[0]
    const maxTimeZone = labels[labels.length - 1]
    const values = Object.values(timeData).reverse();
    return (
        <>
            <ChartContainer timeRange={this.state.timerange} >
                <ChartRow height="200">
                    <YAxis id="y" label="Price ($)" min={0.5} max={1.5} format="$,.2f" />
                    <Charts>
                        <LineChart
                            axis="y"
                            breakLine={false}
                            series={currencySeries}
                            columns={["aud", "euro"]}
                            style={style}
                            interpolation="curveBasis" />
                    </Charts>
                </ChartRow>
            </ChartContainer>
        </>
    )
}
export default TimeSeriesChart;