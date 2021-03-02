import React, { useEffect, useState } from "react";
import { getCountBy } from '../util/util';
import LinePlot from './Line';
import axios from "axios";
import Button from 'react-bootstrap/Button';

const Dashboard = () => {
    const [status, setStatus] = useState("RAW")
    const [data, setData] = useState([]);
    const [exitData, setExitData] = useState([]);
    const [entryData, setEntryData] = useState([]);


    // const { REACT_APP_GET_API } = process.env;
    useEffect((mode) => {

        axios.get("http://localhost:5000/getData").then(
            response => {
                setData(response.data)

            });

    }, []);


    const handleAllDataClick = () => {
        axios.get("http://localhost:5000/getData").then(
            response => {
                setData(response.data)

            });
        setStatus("RAW");
    }
    const handleEntryDataClick = () => {
        axios.get("http://localhost:5000/getEntryData").then(
            response => {
                setEntryData(response.data)
                // setRawData(response.data);
            });
        setStatus("ENTRY");
    }
    const handleExitDataCLick = () => {
        axios.get("http://localhost:5000/getExitData").then(
            response => {
                setExitData(response.data)
                // setRawData(response.data);
            });
        setStatus("EXIT");
    }
    return (
        <>
            <div>

                <h1>React app</h1>

                {/* {data.length > 0 && <LinePlot seriesData={data} />} */}

                {(() => {
                    switch (status) {
                        case "EXIT":
                            return exitData.length > 0 && <LinePlot timeData={getCountBy(exitData)} label={"Exit"} />;
                        case "ENTRY":
                            return entryData.length > 0 && <LinePlot timeData={getCountBy(entryData)} label={"Entry"} />;
                        default:
                            return data.length > 0 && <LinePlot timeData={getCountBy(data)} label={""} />;
                    }
                }
                )()}
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
        </>
    )
}
export default Dashboard;