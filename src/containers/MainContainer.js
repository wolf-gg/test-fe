import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { DatePicker, Space } from 'antd';
import axios from '../helpers/axios';

import AppointmentTable from '../components/AppointmentTable';
import Topbar from './Topbar';

import * as dateHelper from '../helpers/dateHelper';

const { RangePicker } = DatePicker;

const StyledMainContainer = styled.div`
    border: 1px solid lightgrey;
    padding: 4px;
    width: 1900px;
`;

const Search = styled.div`
    padding: 10px;
    text-align: center;
`;

function MainContainer() {
    const [dates, setDates] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        if (dates.length > 0) {
            const dateArray = dates.map((date) => dateHelper.getDate(date));

            const { data } = await axios.get('/appointments', {
                params: {
                    from: dateArray[0],
                    to: dateArray[1]
                }
            });

            setAppointments(data);
        } else {
            const { data } = await axios.get('/appointments');
            
            setAppointments(data);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, [dates]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/appointment/${id}`);

            const { data } = await axios.get('/appointments');

            setAppointments(data);
        } catch (error) {
            console.log(error);
        }
    }

    const refreshAppointment = async (id, index) => {
        try {
            const { data } = await axios.get(`/appointment/${id}`);

            const updatedAppointment = data;

            const newAppointments = [...appointments];

            newAppointments[index] = updatedAppointment;

            setAppointments(newAppointments);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDatesChange = (newa) => {
        setDates(newa);
    }

    const renderDatePicker = () => (
        <Search>
            <Space direction="vertical" size={12}>
                <RangePicker 
                    format='MMMM D, YYYY'
                    onChange={handleDatesChange}
                />
            </Space>
        </Search>
    )

    return (
        <StyledMainContainer>
            <Topbar />
            {renderDatePicker()}
            <AppointmentTable 
                dates={dates}
                appointments={appointments}
                handleDelete={handleDelete}
                refreshTable={fetchAppointments}
                refreshAppointment={refreshAppointment}
            />
        </StyledMainContainer>
    )
}

export default MainContainer;