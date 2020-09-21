import * as React from 'react';
import styled from '@emotion/styled';

import Row from '../common/Row';
import Button from '../common/Button';
import Cell from '../common/Cell';

const StyledCell = styled(Cell)`
    padding: 10px 10px 10px 10px;
    text-align: center;
    width: 200px;
`;

function AppointmentRow(props) {
    const { isHeader, appointment, changeIsEdit, handleDelete } = props;

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
                            handleDelete(_id)
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
                content={toArray(appointment)}
            />
            <StyledCell
                content={renderButtons()}
            />
        </tr>        
    );
}

export default AppointmentRow;