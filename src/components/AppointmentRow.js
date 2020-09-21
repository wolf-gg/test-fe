import * as React from 'react';
import styled from '@emotion/styled';

import Row from '../common/Row';
import Button from '../common/Button';
import Cell from '../common/Cell';

import * as dateHelper from '../helpers/dateHelper';
import { appointmentHeaders } from '../constants/headers';

const StyledCell = styled(Cell)`
    padding: 10px 10px 10px 10px;
    text-align: center;
    width: 200px;
`;

function AppointmentRow(props) {
    const { isHeader, appointment, changeIsEdit, handleDelete } = props;

    const getArray = (appointment) => {
        if (!isHeader) {
            const {
                to,
                from,
                name,
                comment
            } = appointment;
            
            return [
                name,
                dateHelper.getDate(to, from),
                dateHelper.getSchedule(to, from),
                comment
            ];
        } else {
            return appointmentHeaders;
        }
            
    }

    const renderButtons = () => {
        if (!isHeader) {
            return (
                <div>
                    <Button
                        onClick={changeIsEdit}
                        content='Edit'
                    />
                    <Button 
                        onClick={() => {
                            handleDelete(appointment.id)
                        }}
                        content='Delete'
                    />
                </div>
            )
        }
    }

    return (
        <tr>
            <Row
                isHeader={isHeader}
                content={getArray(appointment)}
            />
            <StyledCell
                content={renderButtons()}
            />
        </tr>        
    );
}

export default AppointmentRow;