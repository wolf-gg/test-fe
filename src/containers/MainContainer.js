import * as React from 'react';
import styled from '@emotion/styled';

import AppointmentTable from './AppointmentTable';

const StyledMainContainer = styled.div`
    border: 1px solid lightgrey;
    padding: 4px;
`;

function MainContainer() {
    return (
        <StyledMainContainer>
            <AppointmentTable />
        </StyledMainContainer>
    )
}

export default MainContainer;