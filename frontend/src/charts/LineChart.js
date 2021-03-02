import Chart from "react-apexcharts";

const LineChart = (props) => {
    return (
        <>

            <div id="chart" style={{ height: "inherit", magrin: "40px", overflow: "auto" }}>
                {props && <Chart options={props.options} series={props.series} height={600} type={"line"} />}
            </div>
        </>
    )
}
export default LineChart;