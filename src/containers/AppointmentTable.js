import * as React from 'react';
import axios from '../helpers/axios';

import AppointmentRow from './AppointmentRow';
import { appointmentHeaders } from '../constants/headers';

class AppointmentTable extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            appointments: [
                {
                    "name": "testName",
                    "to": "TO",
                    "from": "FROM",
                    "comment": "testComment"
                }
            ]
        }
    }

    async componentDidMount() {
        const { data } = await axios.get('/appointments');

        console.log(data);

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

    renderCells = () => this.state.appointments.map(apppointment => (
        <AppointmentRow
            appointment={apppointment}
        />
    ));

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