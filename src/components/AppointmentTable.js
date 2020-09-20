import * as React from 'react';

import AppointmentRow from './AppointmentRow';
import { appointmentHeaders } from '../constants/headers';
import axios from '../helpers/axios';

class AppointmentTable extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            appointments: []
        }
    }

    async componentDidMount() {
        const { data } = await axios.get('/appointments');

        this.setState({
            appointments: data
        });
    }

    async componentDidUpdate() {
        const { data } = await axios.get('/appointments');

        this.setState({
            appointments: data
        });
    }

    renderHeaders = () => {
        return (
            <AppointmentRow
                isHeader='true'
                appointment={appointmentHeaders}
            />
        );
    };

    renderCells = () => {
        if (this.state.appointments) {
            return this.state.appointments.map(apppointment => (
                <AppointmentRow
                    appointment={apppointment}
                />
            ));
        }
    }

    render() {
        return (
            <table>
                <thead>
                    {this.renderHeaders()}
                </thead>
                <tbody>
                    {this.renderCells()}
                </tbody>
            </table>
        )
    }

}

export default AppointmentTable;