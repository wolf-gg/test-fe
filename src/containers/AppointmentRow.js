import * as React from 'react';

import Row from '../components/Row';

function AppointmentRow(props) {
    const { isHeader, appointment } = props;

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

    return (
        <Row
            isHeader={isHeader}
            content={toArray(appointment)}
        />
    );
}

export default AppointmentRow;