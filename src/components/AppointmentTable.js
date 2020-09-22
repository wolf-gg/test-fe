import * as React from 'react';
import styled from '@emotion/styled';

import AppointmentRow from './AppointmentRow';
import AddRow from '../components/AddRow'
import EditRow from '../components/EditRow';

const StyledTable = styled.table`
    table-layout: fixed;
`;

class AppointmentTable extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isEdit: []
        }
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

    renderCells = () => {
        if (this.props.appointments) {
            return this.props.appointments.map((appointment, index) => {
                if (this.state.isEdit[index]) {
                    return (
                        <EditRow
                            appointment={appointment}
                            changeIsEdit={() => {
                                this.changeIsEdit(index);
                            }}
                            refreshAppointment={() => {
                                this.props.refreshAppointment(appointment._id, index);
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
                                this.props.handleDelete(appointment._id);
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
                        refreshTable={this.props.refreshTable}
                    />
                </tbody>
            </StyledTable>
        )
    }

}

export default AppointmentTable;