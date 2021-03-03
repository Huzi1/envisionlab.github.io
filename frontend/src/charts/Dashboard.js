import React, { useEffect, useState } from "react";
import ApexLineChart from './ApexLineChart';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'

const Dashboard = () => {
    const [status, setStatus] = useState("RAW")
    const [data, setData] = useState([]);
    const [active, setActive] = useState(false);
    const [exitData, setExitData] = useState([]);
    const [entryData, setEntryData] = useState([]);
    const [count, setCount] = useState({ start: 0, end: 500 })


    useEffect(() => {
        
        axios.post("http://localhost:5000/getData", { start: count.start, end: count.end }).then(
            response => {
                setData(response.data);
                setActive(true);

            });

    }, []);

    const handlePrevButtonCLick = () => {

        if (count.start > 0) {
            setCount({ start: count.start - 500, end: count.end - 500 })
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

        setCount({ start: count.start + 500, end: count.end + 500 })

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
        axios.post("http://localhost:5000/getData", { start: count.start, end: count.end }).then(
            response => {
                setData(response.data)

            });
        setStatus("RAW");
    }
    const handleEntryDataClick = () => {
        axios.post("http://localhost:5000/getEntryData", { start: count.start, end: count.end }).then(
            response => {
                setEntryData(response.data)
                // setRawData(response.data);
            });
        setStatus("ENTRY");
    }
    const handleExitDataCLick = () => {
        axios.post("http://localhost:5000/getExitData", { start: count.start, end: count.end }).then(
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
            </div>}
        </>
    )
}
export default Dashboard;