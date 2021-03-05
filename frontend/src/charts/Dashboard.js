import React, { useEffect, useState } from "react";
import ApexLineChart from './ApexLineChart';
import axios from "axios";
import { Button, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import DatePicker from './DatePicker'


const Dashboard = () => {
    const [status, setStatus] = useState("RAW")
    const [data, setData] = useState([]);
    const [active, setActive] = useState(false);
    const [exitData, setExitData] = useState([]);
    const [entryData, setEntryData] = useState([]);
    const [count, setCount] = useState({ start: 0, end: 200 })
    const [dateFilter, setDateFilter] = useState(false)
    const [dates, setDates] = useState({ start: '', end: '', show: false })
    const [render, setRender] = useState(false)

    useEffect(() => {
        console.log("useEffect Running")
        if (render === false) {
            axios.get("http://localhost:5000/getAllData", { params: { start: count.start, end: count.end, flag: dateFilter, dateTimeStart: dates.start, dateTimeEnd: dates.end } }).then(
                response => {
                    setData(response.data);
                    setActive(true);
                    // if (dateFilter === true) {
                    // setDateFilter(false);
                    // }
                    setRender(true)
                }).catch(e => { console.log(e) });
        }


    }, [count, render, status]);
    const handleDatesChange = (values) => {
        setDates({ start: values.start, end: values.end, show: true })
    }
    const handleDateFilter = () => {
        setDateFilter(true);
        setRender(false);
    }
    const handlePrevButtonCLick = () => {

        if (count.start > 0) {
            setCount({ start: count.start - 200, end: count.end - 200 })
        }
        if (status === "RAW") {
            handleAllDataClick();
        }
        if (status === "ENTRY") {

            handleEntryDataClick();
        }
        if (status === "EXIT") {

            handleExitDataCLick();
        }


    }


    const handleNextButtonCLick = () => {

        setCount({ start: count.start + 200, end: count.end + 200 })

        if (status === "RAW") {
            handleAllDataClick();
        }
        if (status === "ENTRY") {

            handleEntryDataClick();
        }
        if (status === "EXIT") {

            handleExitDataCLick();
        }




    }
    const handleAllDataClick = () => {
        axios.get("http://localhost:5000/getAllData", { params: { start: count.start, end: count.end, flag: dateFilter, dateTimeStart: dates.start, dateTimeEnd: dates.end } }).then(
            response => {
                setData(response.data)

            });
        setStatus("RAW");
    }
    const handleEntryDataClick = () => {
        axios.get("http://localhost:5000/getEntryData", { params: { start: count.start, end: count.end, flag: dateFilter, dateTimeStart: dates.start, dateTimeEnd: dates.end } }).then(
            response => {
                setEntryData(response.data)
                // setRawData(response.data);
            });
        setStatus("ENTRY");
    }
    const handleExitDataCLick = () => {
        axios.get("http://localhost:5000/getExitData", { params: { start: count.start, end: count.end, flag: dateFilter, dateTimeStart: dates.start, dateTimeEnd: dates.end } }).then(
            response => {
                setExitData(response.data)
                // setRawData(response.data);
            });
        setStatus("EXIT");
    }

    return (
        <>
            {active === false ? <Spinner animation="grow" /> : <div>
                <div>

                    <h1>Data Visiualisation on ApexCharts JS</h1>
                    {/* {data.length < 0 && <Spinner animation="grow" />} */}

                    {(() => {
                        if (count) {
                            switch (status) {
                                case "EXIT":
                                    return exitData.length > 0 && <ApexLineChart timeData={exitData} label={status} paginationStart={count.start} paginationStop={count.end} />;
                                case "ENTRY":
                                    return entryData.length > 0 && <ApexLineChart timeData={entryData} label={status} paginationStart={count.start} paginationStop={count.end} />;
                                default:
                                    return data.length > 0 && <ApexLineChart timeData={data} label={""} paginationStart={count.start} paginationStop={count.end} />;
                            }
                        }
                    }
                    )()}
                </div>
                <div>
                    <Button variant="secondary" onClick={handlePrevButtonCLick} id="start">Previous</Button> <label id="mylabel"> Data from {count.start} to {count.end}</label> <Button variant="secondary" id="end" onClick={handleNextButtonCLick}>Next</Button>
                </div>

                <div>
                    <Button variant="primary" size="lg" active onClick={handleAllDataClick} style={{ padding: "10px", margin: "10px" }}>
                        All Data
                </Button>

                    <Button variant="primary" size="lg" active onClick={handleEntryDataClick} style={{ padding: "10px", margin: "10px" }}>
                        Entry Data
                </Button>
                    <Button variant="primary" size="lg" active onClick={handleExitDataCLick} style={{ padding: "10px", margin: "10px" }}>
                        Exit Data
                </Button>
                </div>
                <div>
                    {dates.show === false
                        ? <label>Set date time range for filter samples</label>

                        : <Button variant="primary" size="lg" active onClick={handleDateFilter} style={{ padding: "10px", margin: "10px" }}>
                            Set Date filter
                         </Button>
                    }

                    <DatePicker handleDatesChange={handleDatesChange} />
                </div>
            </div>}

        </>
    )
}
export default Dashboard;

