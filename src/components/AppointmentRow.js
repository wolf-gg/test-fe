import * as React from 'react';
import styled from '@emotion/styled';
import axios from '../helpers/axios';

import Row from '../common/Row';
import Button from '../common/Button';
import Cell from '../common/Cell';

const StyledCell = styled(Cell)`
    padding: 10px 10px 10px 10px;
    text-align: center;
    width: 200px;
`;

function AppointmentRow(props) {
    const { isHeader, appointment } = props;

    const { _id } = appointment;

    const toArray = (appointment) => {
        const {
            to,
            from,
            name,
            comment
        } = appointment;

        return [
            name,
            to,
            from,
            comment
        ];
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`/appointment/${_id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const renderButtons = () => {
        if (!isHeader) {
            return (
                <Button 
                    onClick={handleDelete}
                    content='Delete'
                />
            )
        }
    }

    return (
        <tr>
            <Row
                isHeader={isHeader}
                content={toArray(appointment)}
            />
            <StyledCell
                content={renderButtons()}
            />
        </tr>        
    );
}

export default AppointmentRow;