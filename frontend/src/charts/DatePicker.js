import moment from "moment-timezone";
import React, { useState } from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

const DatePicker = (props) => {
    const { handleDatesChange } = props;
    const [value, onChange] = useState([new Date(), new Date()]);

    const handleChange = (e) => {
        // console.log(e.target.value);
    

        var start = moment.tz(value[0], "Australia/Melbourne").utc().format();
        var end = moment.tz(value[1], "Australia/Melbourne").utc().format();
        const values = { start: start, end: end }
        handleDatesChange(values)
    }
    return (
        <>
            <DateTimeRangePicker
                onChange={(e) => {
                    onChange(e);
                    handleChange(e)
                }}
                value={value}
            />
        </>
    )
}
export default DatePicker;


// 2021-02-24T10:03:48.001Z

// YYYY DD MM hh:mm:ss

