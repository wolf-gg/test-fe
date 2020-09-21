import * as React from 'react';
import styled from '@emotion/styled';

import AppointmentRow from './AppointmentRow';
import AddRow from '../components/AddRow'
import EditRow from '../components/EditRow';
import axios from '../helpers/axios';

const StyledTable = styled.table`
    table-layout: fixed;
`;

class AppointmentTable extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            appointments: [],
            isEdit: []
        }
    }

    async componentDidMount() {
        const { data } = await axios.get('/appointments');

        const isEdit = data.map(() => 0);

        this.setState({
            appointments: data,
            isEdit
        });
    }

    renderHeaders = () => {
        return (
            <AppointmentRow
                isHeader='true'
            />
        );
    };

    changeIsEdit = (index) => {
        let newIsEdit = this.state.isEdit;

        newIsEdit[index] = !this.state.isEdit[index];

        this.setState({
            isEdit: newIsEdit
        });
    }

    refreshAppointment = async (id, index) => {
        try {
            const { data } = await axios.get(`/appointment/${id}`);

            const updatedAppointment = data;

            const appointments = this.state.appointments;

            appointments[index] = updatedAppointment;

            this.setState({
                appointments
            });
        } catch (error) {
            console.log(error);
        }
    }

    refreshTable = async () => {
        try {
            const { data } = await axios.get('/appointments');

            this.setState({
                appointments: data
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleDelete = async (id) => {
        try {
            await axios.delete(`/appointment/${id}`);

            const { data } = await axios.get('/appointments');

            this.setState({
                appointments: data
            })
        } catch (error) {
            console.log(error);
        }
    }

    renderCells = () => {
        if (this.state.appointments) {
            return this.state.appointments.map((appointment, index) => {
                if (this.state.isEdit[index]) {
                    return (
                        <EditRow
                            appointment={appointment}
                            changeIsEdit={() => {
                                this.changeIsEdit(index);
                            }}
                            refreshAppointment={() => {
                                this.refreshAppointment(appointment._id, index);
                            }}
                        />
                    );
                } else {
                    return (
                        <AppointmentRow
                            appointment={appointment}
                            changeIsEdit={() => {
                                this.changeIsEdit(index);
                            }}
                            handleDelete={() => {
                                this.handleDelete(appointment._id);
                            }}
                        />
                    );
                }
            });
        }
    }

    render() {
        return (
            <StyledTable>
                <thead>
                    {this.renderHeaders()}
                </thead>
                <tbody>
                    {this.renderCells()}
                    <AddRow
                        refreshTable={this.refreshTable}
                    />
                </tbody>
            </StyledTable>
        )
    }

}

export default AppointmentTable;